import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Req,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
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
import { User } from '../entities/User.entity';

@ApiTags('link-engine')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
@Controller('link-engine')
export class LinkEngineController {
  constructor(private readonly linkEngineService: LinkEngineService) {}

  @Get('getDomainsList')
  async getList(@Req() req: Request) {
    return this.linkEngineService.getDomainsList(req.user as User);
  }

  @Post('createOrUpdateDomain')
  async createOrUpdateDomain(
    @Body() data: CreateUpdateDomain,
    @Req() req: Request,
  ) {
    const [result, message] = await this.linkEngineService.createOrUpdateDomain(
      data,
      req.user as User,
    );
    if (result) {
      return {
        ok: true,
        message: 'Domain was set successfully',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Delete('deleteDomain')
  async deleteDomain(@Body() data: DeleteDomain, @Req() req: Request) {
    const [result, message] = await this.linkEngineService.deleteDomain(
      data,
      req.user as User,
    );
    if (result) {
      return {
        ok: true,
        message: 'Domain was deleted successfully',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: message,
    });
  }

  @Post('createRedirect')
  async createRedirect(@Body() data: CreateRedirect, @Req() req: Request) {
    const [result, message] = await this.linkEngineService.createRedirect(
      data,
      req.user as User,
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

  @Get('getRedirectionsList')
  async getRedirectionsList(@Req() req: Request) {
    return this.linkEngineService.getRedirectionsList(req.user as User);
  }

  @Post('updateRedirect')
  async updateRedirect(@Body() data: UpdateRedirect, @Req() req: Request) {
    const [result, message] = await this.linkEngineService.updateRedirect(
      data,
      req.user as User,
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

  @Delete('deleteRedirect')
  async deleteRedirect(@Body() data: DeleteRedirect, @Req() req: Request) {
    const [result, message] = await this.linkEngineService.deleteRedirect(
      data,
      req.user as User,
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
}
