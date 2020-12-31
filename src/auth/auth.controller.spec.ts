import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JweService } from './jweService';
import { mockPublicKey } from './auth.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UserMock } from '../users/users.service.spec';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JweService,
        {
          provide: 'JWE_ASYMMETRIC_KEYS',
          useFactory: mockPublicKey,
        },
        { provide: getRepositoryToken(User), useValue: UserMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
