import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ClickReportService } from './click-report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Request } from 'express';
import { User } from '../entities/User.entity';
import { BaseListQuery } from '../dtos/common';

@Controller('click-report')
@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
export class ClickReportController {
  constructor(private readonly clickReportService: ClickReportService) {}

  @Get()
  findAll(@Req() req: Request, @Query() options?: BaseListQuery) {
    return this.clickReportService.findAll(req.user as User, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.clickReportService.findOne(+id, req.user as User);
  }
}
