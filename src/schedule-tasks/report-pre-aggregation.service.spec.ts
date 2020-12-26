import { Test, TestingModule } from '@nestjs/testing';
import { ReportPreAggregationService } from './report-pre-aggregation.service';

describe('ReportPreAggregationService', () => {
  let service: ReportPreAggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportPreAggregationService],
    }).compile();

    service = module.get<ReportPreAggregationService>(
      ReportPreAggregationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
