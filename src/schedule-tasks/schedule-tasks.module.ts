import { Module } from '@nestjs/common';
import { MonthlyUsageInvoiceService } from './monthly-usage-invoice.service';
import { ExtraClicksChecksService } from './extra-clicks-checks.service';
import { ReportPreAggregationService } from './report-pre-aggregation.service';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report',
      processors: [join(__dirname, 'jobs', 'report-pre-aggregation.js')],
    }),
  ],
  providers: [
    MonthlyUsageInvoiceService,
    ExtraClicksChecksService,
    ReportPreAggregationService,
  ],
})
export class ScheduleTasksModule {}
