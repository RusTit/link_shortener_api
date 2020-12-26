import { Test, TestingModule } from '@nestjs/testing';
import { ExtraClicksChecksService } from './extra-clicks-checks.service';

describe('ExtraClicksChecksService', () => {
  let service: ExtraClicksChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtraClicksChecksService],
    }).compile();

    service = module.get<ExtraClicksChecksService>(ExtraClicksChecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
