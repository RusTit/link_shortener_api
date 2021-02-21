import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Request } from 'express';
import { User } from '../entities/User.entity';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.paymentsService.findAll(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.paymentsService.findOne(+id, req.user as User);
  }
}
