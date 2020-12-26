import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyUsageInvoiceService } from './monthly-usage-invoice.service';

describe('MonthlyUsageInvoiceService', () => {
  let service: MonthlyUsageInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyUsageInvoiceService],
    }).compile();

    service = module.get<MonthlyUsageInvoiceService>(
      MonthlyUsageInvoiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
