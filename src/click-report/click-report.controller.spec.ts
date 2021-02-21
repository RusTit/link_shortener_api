import { Test, TestingModule } from '@nestjs/testing';
import { ClickReportController } from './click-report.controller';
import { ClickReportService } from './click-report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import {
  ClickReportEntityMock,
  MappingEntityMock,
} from './click-report.service.spec';
import { MappingEntity } from '../entities/Mapping.entity';

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
        {
          provide: getRepositoryToken(MappingEntity),
          useValue: MappingEntityMock,
        },
      ],
    }).compile();

    controller = module.get<ClickReportController>(ClickReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
