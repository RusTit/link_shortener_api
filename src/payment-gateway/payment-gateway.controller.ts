import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Param,
  NotFoundException,
  BadRequestException,
  Query,
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
    if (invoice.payment) {
      throw new BadRequestException({
        ok: false,
        status: 'Already paid',
      });
    }
    const session = await this.paymentGatewayService.createSession(invoice);
    return { sessionId: session.id };
  }

  @Get('stripe/success.html')
  async stripePaymentSuccess(@Query('session_id') session_id: string) {
    const session = await this.paymentGatewayService.getSessionById(session_id);
    return (
      `<html><head><title>Stripe payment success</title></head>` +
      `<body></body>` +
      `</html>`
    );
  }

  @Post('stripe/webhook')
  async stripePaymentWebhook(@Body() webhookData: any) {
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
