import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ExtraClicksChecksService {
  private readonly logger = new Logger(ExtraClicksChecksService.name);

  @Cron('0 0 0 * * *')
  handleCron() {
    this.logger.debug('Check extra clicks each day');
  }
}
