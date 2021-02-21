import { Controller, Get } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment-gateway')
@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Get('coin/callback')
  async coinPaymentCallback() {
    return {
      ok: true,
      message: 'mock',
    };
  }

  @Get('stripe/callback')
  async stripePaymentCallback() {
    return {
      ok: true,
      message: 'mock',
    };
  }

  @Get('paypal/callback')
  async paypalPaymentCallback() {
    return {
      ok: true,
      message: 'mock',
    };
  }
}
