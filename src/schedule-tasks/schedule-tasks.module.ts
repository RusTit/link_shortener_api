import { Module } from '@nestjs/common';
import { MonthlyUsageInvoiceService } from './monthly-usage-invoice.service';
import { ExtraClicksChecksService } from './extra-clicks-checks.service';
import { ReportPreAggregationService } from './report-pre-aggregation.service';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

const pos = __filename.lastIndexOf('.');
const ext = __filename.slice(pos + 1);

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report',
      processors: [join(__dirname, 'jobs', `report-pre-aggregation.${ext}`)],
    }),
    BullModule.registerQueue({
      name: 'every_day_clicks',
      processors: [
        join(__dirname, 'jobs', `every_day_clicks-aggregation.${ext}`),
      ],
    }),
  ],
  providers: [
    MonthlyUsageInvoiceService,
    ExtraClicksChecksService,
    ReportPreAggregationService,
  ],
})
export class ScheduleTasksModule {}
