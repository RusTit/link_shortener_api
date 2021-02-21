import { Injectable } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(UserInvoice)
    private readonly userInvoiceRepository: Repository<UserInvoice>,
  ) {}
  async findAll(user: User): Promise<UserInvoice[]> {
    return this.userInvoiceRepository.find({
      where: {
        user,
      },
    });
  }

  async findOne(id: number, user: User): Promise<UserInvoice | undefined> {
    return this.userInvoiceRepository.findOne({
      where: {
        id,
        user,
      },
    });
  }

  async remove(id: number, user: User): Promise<boolean> {
    const existingInvoice = await this.userInvoiceRepository.findOne({
      where: {
        id,
        user,
      },
    });
    if (existingInvoice) {
      await this.userInvoiceRepository.remove(existingInvoice);
      return true;
    }
    return false;
  }
}
