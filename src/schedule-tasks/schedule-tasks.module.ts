import { Module } from '@nestjs/common';
import { MonthlyUsageInvoiceService } from './monthly-usage-invoice.service';
import { ExtraClicksChecksService } from './extra-clicks-checks.service';
import { ReportPreAggregationService } from './report-pre-aggregation.service';

@Module({
  providers: [
    MonthlyUsageInvoiceService,
    ExtraClicksChecksService,
    ReportPreAggregationService,
  ],
})
export class ScheduleTasksModule {}
