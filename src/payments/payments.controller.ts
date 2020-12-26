import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

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
