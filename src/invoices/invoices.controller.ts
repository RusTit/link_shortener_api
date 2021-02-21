import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Request } from 'express';
import { User } from '../entities/User.entity';

@Controller('invoices')
@ApiTags('invoices')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.invoicesService.findAll(req.user as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.invoicesService.findOne(+id, req.user as User);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.invoicesService.remove(+id, req.user as User);
  }
}
