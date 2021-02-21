import { Job, DoneCallback } from 'bull';
import { Logger } from '@nestjs/common';
import { Connection, createConnection, In, MoreThanOrEqual } from 'typeorm';
import { User } from '../../entities/User.entity';
import { MappingEntity } from '../../entities/Mapping.entity';
import { ClickReportEntity } from '../../entities/ClickReport.entity';
import * as moment from 'moment';

export default async function (job: Job, cb: DoneCallback) {
  Logger.debug(
    `Every day clicks task: [${process.pid}] ${JSON.stringify(job.data)}`,
  );
  let con: Connection | undefined;
  try {
    con = await createConnection();
    const userRepository = con.getRepository(User);
    const allUsers = await userRepository.find({
      select: ['id'],
    });
    const mappingRepository = con.getRepository(MappingEntity);
    const clickReportRepository = con.getRepository(ClickReportEntity);
    const lastDay = moment().startOf('day').toDate();
    for (const user of allUsers) {
      const usersMappings = await mappingRepository.find({
        where: {
          user_id: user.id,
        },
        select: ['new_url'],
      });
      const proxyDomains = usersMappings.map((entity) => entity.new_url);
      const clickReports = await clickReportRepository.find({
        where: {
          proxy_domain: In(proxyDomains),
          report_time: MoreThanOrEqual(lastDay),
        },
      });
    }
    cb(null, 'Success');
  } catch (e) {
    Logger.error(e);
    cb(e);
  } finally {
    if (con) {
      await con.close();
    }
  }
  Logger.debug(`Every day clicks task: [${process.pid}] finished`);
}
