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
    const [result, message] = await this.linkEngineService.createOrUpdateDomain(
      data,
    );
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Post('deleteDomain')
  async deleteDomain(@Body() data: DeleteDomain) {
    const [result, message] = await this.linkEngineService.deleteDomain(data);
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Post('createRedirect')
  async createRedirect(@Body() data: CreateRedirect) {
    const [result, message] = await this.linkEngineService.createRedirect(data);
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Post('updateRedirect')
  async updateRedirect(@Body() data: UpdateRedirect) {
    const [result, message] = await this.linkEngineService.updateRedirect(data);
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Post('deleteRedirect')
  async deleteRedirect(@Body() data: DeleteRedirect) {
    const [result, message] = await this.linkEngineService.deleteRedirect(data);
    if (result) {
      return {
        ok: true,
        message: 'mock',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }
}
