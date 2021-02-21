import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportService } from './click-report.service';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const ClickReportEntityMock: Partial<ClickReportEntity> = {};

describe('ClickReportService', () => {
  let service: ClickReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClickReportService,
        {
          provide: getRepositoryToken(ClickReportEntity),
          useValue: ClickReportEntityMock,
        },
      ],
    }).compile();

    service = module.get<ClickReportService>(ClickReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
