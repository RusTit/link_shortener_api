import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MonthlyUsageInvoiceService {
  private readonly logger = new Logger(MonthlyUsageInvoiceService.name);

  @Cron('0 0 0 1 * *')
  handleCron() {
    this.logger.debug('Run monthly invoice generation');
  }
}
