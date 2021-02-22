import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaymentGatewayService } from './payment-gateway.service';
import { stripeMock } from './payment-gateway.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { UserInvoiceEntityMock } from '../invoices/invoices.service.spec';
import { UserPayment } from '../entities/UserPayment.entity';
import { UserPaymentEntityMock } from '../payments/payments.service.spec';

describe('PaymentGatewayController', () => {
  let controller: PaymentGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentGatewayController],
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

    controller = module.get<PaymentGatewayController>(PaymentGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
