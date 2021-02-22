import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Param,
  NotFoundException,
} from '@nestjs/common';
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

  @Get('stripe/session/:invoice')
  async stripeCreateNewSession(@Param('invoice') invoiceId: number) {
    const invoice = await this.paymentGatewayService.getInvoice(invoiceId);
    if (!invoice) {
      throw new NotFoundException({
        ok: false,
        status: 'Invoice not found',
      });
    }
  }

  @Post('stripe/webhook')
  async stripePaymentCallback(@Body() webhookData: any) {
    Logger.debug('Stripe webhook');
    Logger.debug(webhookData);
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
