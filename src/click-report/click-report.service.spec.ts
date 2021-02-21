import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportService } from './click-report.service';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MappingEntity } from '../entities/Mapping.entity';

export const ClickReportEntityMock: Partial<ClickReportEntity> = {};
export const MappingEntityMock: Partial<MappingEntity> = {};

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
        {
          provide: getRepositoryToken(MappingEntity),
          useValue: MappingEntityMock,
        },
      ],
    }).compile();

    service = module.get<ClickReportService>(ClickReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
