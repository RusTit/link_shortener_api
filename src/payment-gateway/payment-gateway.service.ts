import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { UserPayment } from '../entities/UserPayment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @Inject('STRIPE_API') private stripe: Stripe,
    @InjectRepository(UserInvoice)
    private readonly userInvoiceRepository: Repository<UserInvoice>,
    @InjectRepository(UserPayment)
    private readonly userPaymentRepository: Repository<UserPayment>,
  ) {}

  async getInvoice(id: number): Promise<UserInvoice | undefined> {
    return this.userInvoiceRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createSession(
    invoice: UserInvoice,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const { STRIPE_DOMAIN } = process.env;
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Link-shortener-api',
              description: `invoice#${invoice.id}`,
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${STRIPE_DOMAIN}/payment-gateway/stripe/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${STRIPE_DOMAIN}/payment-gateway/stripe/cancel.html?session_id={CHECKOUT_SESSION_ID}`,
    });
  }

  async getSessionById(
    session_id?: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | null> {
    if (!session_id) {
      return null;
    }
    return this.stripe.checkout.sessions.retrieve(session_id);
  }

  async processCheckoutCompleted(data: any): Promise<void> {
    const session = await this.getSessionById(data.id);
  }
}
