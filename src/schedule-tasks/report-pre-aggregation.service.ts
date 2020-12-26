import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ReportPreAggregationService {
  private readonly logger = new Logger(ReportPreAggregationService.name);

  constructor(@InjectQueue('report') private reportPreAggQueue: Queue) {}

  @Cron('0 * * * * *')
  async handleCron() {
    this.logger.debug('Run every minute to update reports table per day');
    await this.reportPreAggQueue.add({});
  }
}
