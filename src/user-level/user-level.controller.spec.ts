import { Test, TestingModule } from '@nestjs/testing';
import { UserLevelController } from './user-level.controller';
import { UserLevelService } from './user-level.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserLevelEntity } from '../entities/UserLevel.entity';
import { UserLevelEntityMock } from './user-level.service.spec';

describe('UserLevelController', () => {
  let controller: UserLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLevelController],
      providers: [
        UserLevelService,
        {
          provide: getRepositoryToken(UserLevelEntity),
          useValue: UserLevelEntityMock,
        },
      ],
    }).compile();

    controller = module.get<UserLevelController>(UserLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
