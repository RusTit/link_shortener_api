import { Test, TestingModule } from '@nestjs/testing';
import { LinkEngineService } from './link-engine.service';
import { UrlEntity } from '../entities/Url.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MappingEntity } from '../entities/Mapping.entity';

export const UrlEntityMock: Partial<UrlEntity> = {};
export const MappingEntityMock: Partial<MappingEntity> = {};

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
        { provide: getRepositoryToken(UrlEntity), useValue: UrlEntityMock },
        {
          provide: getRepositoryToken(MappingEntity),
          useValue: MappingEntityMock,
        },
      ],
    }).compile();

    service = module.get<LinkEngineService>(LinkEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
