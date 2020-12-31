import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  Body,
  Put,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Request } from 'express';
import { User } from '../entities/User.entity';
import { Token } from '../entities/Token.entity';
import { TokenDto, UpdateTokenDto } from './dto/update-token.dto';

@ApiTags('tokens')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  async create(@Req() req: Request): Promise<TokenDto> {
    const result = await this.tokensService.create(req.user as User);
    if (result) {
      return {
        is_active: result.is_active,
        token: result.token_value,
      };
    }
    throw new BadRequestException({
      ok: false,
      status: `Token wasn't created`,
    });
  }

  @Get()
  async findAll(@Req() req: Request): Promise<TokenDto[]> {
    const dbEntities = await this.tokensService.findAll(req.user as User);
    return dbEntities.map((dbEntity) => {
      return {
        is_active: dbEntity.is_active,
        token: dbEntity.token_value,
      } as TokenDto;
    });
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string,
    @Req() req: Request,
  ): Promise<TokenDto> {
    const token = await this.tokensService.findOne(uuid, req.user as User);
    if (token) {
      return {
        is_active: token.is_active,
        token: token.token_value,
      };
    }
    throw new BadRequestException({
      ok: false,
      status: 'Token not found by id',
    });
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Req() req: Request,
    @Body() updateTokenDto: UpdateTokenDto,
  ) {
    const result = await this.tokensService.update(
      uuid,
      req.user as User,
      updateTokenDto,
    );
    if (result) {
      return {
        ok: true,
        status: 'Token was updated',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: `Token wasn't updated`,
    });
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Req() req: Request) {
    const result = await this.tokensService.remove(uuid, req.user as User);
    if (result) {
      return {
        ok: true,
        status: 'Token was deleted',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: `Token wasn't deleted`,
    });
  }
}
