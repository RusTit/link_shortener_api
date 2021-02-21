import { Test, TestingModule } from '@nestjs/testing';
import { ExtraClicksChecksService } from './extra-clicks-checks.service';
import { getQueueToken } from '@nestjs/bull';

export const mockExtraClicksQueue = {};

describe('ExtraClicksChecksService', () => {
  let service: ExtraClicksChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtraClicksChecksService,
        {
          provide: getQueueToken('every_day_clicks'),
          useValue: mockExtraClicksQueue,
        },
      ],
    }).compile();

    service = module.get<ExtraClicksChecksService>(ExtraClicksChecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
