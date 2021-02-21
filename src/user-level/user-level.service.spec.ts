import { Test, TestingModule } from '@nestjs/testing';
import { UserLevelService } from './user-level.service';
import { UserLevelEntity } from '../entities/UserLevel.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const UserLevelEntityMock: Partial<UserLevelEntity> = {};

describe('UserLevelService', () => {
  let service: UserLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserLevelService,
        {
          provide: getRepositoryToken(UserLevelEntity),
          useValue: UserLevelEntityMock,
        },
      ],
    }).compile();

    service = module.get<UserLevelService>(UserLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
