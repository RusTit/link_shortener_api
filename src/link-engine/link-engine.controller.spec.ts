import { Test, TestingModule } from '@nestjs/testing';
import { LinkEngineController } from './link-engine.controller';
import { LinkEngineService } from './link-engine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/Url.entity';
import { UrlEntityMock } from './link-engine.service.spec';

describe('LinkEngineController', () => {
  let controller: LinkEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkEngineController],
      providers: [
        LinkEngineService,
        {
          provide: 'LINK_ENGINE_URL',
          useFactory: () => {
            return process.env.LINK_ENGINE_URL ?? 'http://192.99.10.113:11000';
          },
        },
        { provide: getRepositoryToken(UrlEntity), useValue: UrlEntityMock },
      ],
    }).compile();

    controller = module.get<LinkEngineController>(LinkEngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
