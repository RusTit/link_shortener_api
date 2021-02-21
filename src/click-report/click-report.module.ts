import { Module } from '@nestjs/common';
import { ClickReportService } from './click-report.service';
import { ClickReportController } from './click-report.controller';

@Module({
  controllers: [ClickReportController],
  providers: [ClickReportService]
})
export class ClickReportModule {}
