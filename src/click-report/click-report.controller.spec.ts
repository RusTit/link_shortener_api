import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportController } from './click-report.controller';
import { ClickReportService } from './click-report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import { ClickReportEntityMock } from './click-report.service.spec';

describe('ClickReportController', () => {
  let controller: ClickReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClickReportController],
      providers: [
        ClickReportService,
        {
          provide: getRepositoryToken(ClickReportEntity),
          useValue: ClickReportEntityMock,
        },
      ],
    }).compile();

    controller = module.get<ClickReportController>(ClickReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
