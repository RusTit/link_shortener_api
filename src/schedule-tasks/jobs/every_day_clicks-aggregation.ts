import { Job, DoneCallback } from 'bull';
import { Logger } from '@nestjs/common';
import { Connection, createConnection, In, MoreThanOrEqual } from 'typeorm';
import { User } from '../../entities/User.entity';
import { MappingEntity } from '../../entities/Mapping.entity';
import { ClickReportEntity } from '../../entities/ClickReport.entity';
import * as moment from 'moment';
import { UserLevelEntity } from '../../entities/UserLevel.entity';
import { UserInvoice } from '../../entities/UserInvoice.entity';

export default async function (job: Job, cb: DoneCallback) {
  Logger.debug(
    `Every day clicks task: [${process.pid}] ${JSON.stringify(job.data)}`,
  );
  let con: Connection | undefined;
  try {
    con = await createConnection();
    const userRepository = con.getRepository(User);
    const allUsers = await userRepository.find({
      select: ['id', 'user_level'],
    });
    const mappingRepository = con.getRepository(MappingEntity);
    const clickReportRepository = con.getRepository(ClickReportEntity);
    const userLevelRepository = con.getRepository(UserLevelEntity);
    const userInvoiceRepository = con.getRepository(UserInvoice);
    const userLevels = await userLevelRepository.find();
    const startOfTheCurrentMonth = moment().startOf('month').toDate();
    const endOfTheCurrentMonth = moment().endOf('month').toDate();
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
          report_time: MoreThanOrEqual(startOfTheCurrentMonth),
        },
      });
      const totalClicks = clickReports.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.count;
      }, 0);
      const currentUserLevel = userLevels.find(
        (uL) => uL.userLevel === user.user_level,
      );
      if (!currentUserLevel) {
        Logger.warn(
          `Cannot find userLevel ${user.user_level} for user: ${user.id}`,
        );
        continue;
      }
      const invoicesCurrentMonth = await userInvoiceRepository.find({
        where: {
          user,
          billing_period_start: startOfTheCurrentMonth,
          billing_period_end: endOfTheCurrentMonth,
        },
      });
      const invoiceMultiplier = invoicesCurrentMonth.reduce(
        (previousValue, currentValue) => {
          if (currentValue.payment) {
            return previousValue + 1;
          }
          return previousValue;
        },
        0,
      );
      const needNewInvoice =
        totalClicks >=
        (currentUserLevel.allowedClicks + currentUserLevel.extraClicks) *
          invoiceMultiplier;
      if (needNewInvoice) {
        const alreadyCreatedInvoice = invoicesCurrentMonth.find(
          (invoice) => !invoice.payment,
        );
        if (!alreadyCreatedInvoice) {
          const newInvoice = new UserInvoice();
          newInvoice.billing_period_start = startOfTheCurrentMonth;
          newInvoice.billing_period_end = endOfTheCurrentMonth;
          newInvoice.user = user;
          newInvoice.amount = 1000;
          await userInvoiceRepository.save(newInvoice);
        }
      }
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
