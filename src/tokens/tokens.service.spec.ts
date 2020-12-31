import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from '../entities/Token.entity';

export const TokenMock: Partial<Token> = {};

describe('TokensService', () => {
  let service: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,
        { provide: getRepositoryToken(Token), useValue: TokenMock },
      ],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
