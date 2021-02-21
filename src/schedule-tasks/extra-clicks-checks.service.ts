import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ExtraClicksChecksService {
  private readonly logger = new Logger(ExtraClicksChecksService.name);

  constructor(
    @InjectQueue('every_day_clicks') private everyDayClicksPreAggQueue: Queue,
  ) {}

  // @Cron('0 0 0 * * *')
  @Cron('0 * * * * *')
  async handleCron() {
    this.logger.debug('Check extra clicks each day');
    await this.everyDayClicksPreAggQueue.add({});
  }
}
