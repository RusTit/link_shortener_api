import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportService } from './click-report.service';

describe('ClickReportService', () => {
  let service: ClickReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClickReportService],
    }).compile();

    service = module.get<ClickReportService>(ClickReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
