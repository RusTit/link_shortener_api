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
}
