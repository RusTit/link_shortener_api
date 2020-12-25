import { Test, TestingModule } from '@nestjs/testing';
import { LinkEngineService } from './link-engine.service';

describe('LinkEngineService', () => {
  let service: LinkEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkEngineService,
        {
          provide: 'LINK_ENGINE_URL',
          useFactory: () => {
            return process.env.LINK_ENGINE_URL ?? 'http://192.99.10.113:11000';
          },
        },
      ],
    }).compile();

    service = module.get<LinkEngineService>(LinkEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
