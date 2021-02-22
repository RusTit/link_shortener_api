import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGatewayService } from './payment-gateway.service';
import { Stripe } from 'stripe';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { UserInvoiceEntityMock } from '../invoices/invoices.service.spec';
import { UserPayment } from '../entities/UserPayment.entity';
import { UserPaymentEntityMock } from '../payments/payments.service.spec';

export const stripeMock: Partial<Stripe> = {};

describe('PaymentsService', () => {
  let service: PaymentGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentGatewayService,
        {
          provide: 'STRIPE_API',
          useValue: stripeMock,
        },
        {
          provide: getRepositoryToken(UserInvoice),
          useValue: UserInvoiceEntityMock,
        },
        {
          provide: getRepositoryToken(UserPayment),
          useValue: UserPaymentEntityMock,
        },
      ],
    }).compile();

    service = module.get<PaymentGatewayService>(PaymentGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
