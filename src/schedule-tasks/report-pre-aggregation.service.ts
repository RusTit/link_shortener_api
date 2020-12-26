import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReportPreAggregationService {
  private readonly logger = new Logger(ReportPreAggregationService.name);

  @Cron('0 * * * * *')
  handleCron() {
    this.logger.debug('Run every minute to update reports table per day');
  }
}
