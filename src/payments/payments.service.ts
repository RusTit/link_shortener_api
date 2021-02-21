import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayment } from '../entities/UserPayment.entity';
import { User } from '../entities/User.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(UserPayment)
    private readonly userPaymentRepository: Repository<UserPayment>,
  ) {}

  async findAll(user: User): Promise<UserPayment[]> {
    return this.userPaymentRepository.find({
      where: {
        user,
      },
    });
  }

  async findOne(id: number, user: User): Promise<UserPayment | undefined> {
    return this.userPaymentRepository.findOne({
      where: {
        user,
        id,
      },
    });
  }
}
