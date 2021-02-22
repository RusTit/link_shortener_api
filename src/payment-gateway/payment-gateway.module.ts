import { Logger, Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import Stripe from 'stripe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { UserPayment } from '../entities/UserPayment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInvoice, UserPayment])],
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    {
      provide: 'STRIPE_API',
      useFactory: () => {
        const { STRIPE_SEC_KEY } = process.env;
        if (!STRIPE_SEC_KEY) {
          throw new Error(`STRIPE key is invalid ${STRIPE_SEC_KEY}`);
        }
        const stripe = new Stripe(STRIPE_SEC_KEY, {
          apiVersion: '2020-08-27',
        });
        Logger.debug('Stripe initialized');
        return stripe;
      },
    },
  ],
  exports: ['STRIPE_API'],
})
export class PaymentGatewayModule {}
