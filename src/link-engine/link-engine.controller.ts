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
import {
  CreateRedirect,
  CreateUpdateDomain,
  DeleteDomain,
  DeleteRedirect,
  UpdateRedirect,
} from './dtos';

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

  @Post('deleteDomain')
  async deleteDomain(@Body() data: DeleteDomain) {
    const result = await this.linkEngineService.deleteDomain(data);
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

  @Post('createRedirect')
  async createRedirect(@Body() data: CreateRedirect) {
    const result = await this.linkEngineService.createRedirect(data);
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

  @Post('updateRedirect')
  async updateRedirect(@Body() data: UpdateRedirect) {
    const result = await this.linkEngineService.updateRedirect(data);
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

  @Post('deleteRedirect')
  async deleteRedirect(@Body() data: DeleteRedirect) {
    const result = await this.linkEngineService.deleteRedirect(data);
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
