import { Job, DoneCallback } from 'bull';
import { Logger } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { Clicks } from '../../entities/Clicks.entity';
import { ClickReportEntity } from '../../entities/ClickReport.entity';
import * as moment from 'moment';

export default async function (job: Job, cb: DoneCallback) {
  Logger.debug(`Report task: [${process.pid}] ${JSON.stringify(job.data)}`);
  let con: Connection | undefined;
  try {
    con = await createConnection();
    const clicksDataRepository = con.getRepository(Clicks);
    const hourStart = moment().startOf('hour').toDate();
    const hourEnd = moment().endOf('hour').toDate();
    const clicksEntities = await clicksDataRepository
      .createQueryBuilder('clicks')
      .where('clicked_on >= :hourStart', { hourStart })
      .andWhere('clicked_on < :hourEnd', { hourEnd })
      .execute();
    const clicksReportRepository = con.getRepository(ClickReportEntity);
    const clicksCalculation = new Map<string, ClickReportEntity>();
    for (const clickEntity of clicksEntities) {
      let clickReport = clicksCalculation.get(clickEntity.new_url);
      if (!clickReport) {
        clickReport = await clicksReportRepository.findOne({
          where: {
            report_time: hourStart,
          },
        });
        if (clickReport) {
          clickReport.count = 0;
        }
      }
      if (!clickReport) {
        clickReport = new ClickReportEntity();
        clickReport.count = 0;
        clickReport.campaign_id = 0;
        clickReport.country = 'TODO';
        clickReport.orig_domain = clickEntity.clicks_replaced_url;
        clickReport.proxy_domain = clickEntity.clicks_new_url;
        clickReport.referrer = 'TODO';
      }
      clickReport.count += 1;
      clicksCalculation.set(clickEntity.new_url, clickReport);
    }
    const entitiesToSave = [...clicksCalculation.values()].map((v) => {
      v.report_time = hourStart;
      return v;
    });
    await clicksReportRepository.save(entitiesToSave);
    cb(null, 'Success');
  } catch (e) {
    Logger.error(e);
    cb(e);
  } finally {
    if (con) {
      await con.close();
    }
  }
  Logger.debug(`Report task: [${process.pid}] finished`);
}
