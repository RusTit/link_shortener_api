import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from '../entities/Token.entity';
import { TokenMock } from './tokens.service.spec';

describe('TokensController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [
        TokensService,
        { provide: getRepositoryToken(Token), useValue: TokenMock },
      ],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
