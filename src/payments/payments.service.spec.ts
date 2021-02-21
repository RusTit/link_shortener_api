import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { UserPayment } from '../entities/UserPayment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const UserPaymentEntityMock: Partial<UserPayment> = {};

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(UserPayment),
          useValue: UserPaymentEntityMock,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
