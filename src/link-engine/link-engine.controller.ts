import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LinkEngineService } from './link-engine.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { CreateUpdateDomain } from './dtos';

@ApiTags('link-engine')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
@Controller('link-engine')
export class LinkEngineController {
  constructor(private readonly linkEngineService: LinkEngineService) {}

  @Post('createOrUpdateDomain')
  async createOrUpdateDomain(@Body() data: CreateUpdateDomain) {
    const result = await this.linkEngineService.createOrUpdateDomain(data);
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: 'error mock',
    });
  }
}
