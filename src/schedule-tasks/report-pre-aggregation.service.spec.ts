import { Test, TestingModule } from '@nestjs/testing';
import { ReportPreAggregationService } from './report-pre-aggregation.service';
import { getQueueToken } from '@nestjs/bull';

export const mockReportQueue = {};

describe('ReportPreAggregationService', () => {
  let service: ReportPreAggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportPreAggregationService,
        {
          provide: getQueueToken('report'),
          useValue: mockReportQueue,
        },
      ],
    }).compile();

    service = module.get<ReportPreAggregationService>(
      ReportPreAggregationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
