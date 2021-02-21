import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInvoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
