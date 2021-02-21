import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportController } from './click-report.controller';
import { ClickReportService } from './click-report.service';

describe('ClickReportController', () => {
  let controller: ClickReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClickReportController],
      providers: [ClickReportService],
    }).compile();

    controller = module.get<ClickReportController>(ClickReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
