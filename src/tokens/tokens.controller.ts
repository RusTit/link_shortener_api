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
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Request } from 'express';
import { User } from '../entities/User.entity';
import { Token } from '../entities/Token.entity';
import { UpdateTokenDto } from './dto/update-token.dto';

@ApiTags('tokens')
@ApiBearerAuth()
@UseGuards(JweAuthGuard)
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  async create(@Req() req: Request) {
    const result = this.tokensService.create(req.user as User);
    if (result) {
      return {
        ok: true,
        status: 'Token was created',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: `Token wasn't created`,
    });
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Token[]> {
    return this.tokensService.findAll(req.user as User);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Token> {
    const token = await this.tokensService.findOne(+id, req.user as User);
    if (token) {
      return token;
    }
    throw new BadRequestException({
      ok: false,
      status: 'Token not found by id',
    });
  }

  async update(
    @Param('id') id: number,
    @Req() req: Request,
    @Body() updateTokenDto: UpdateTokenDto,
  ) {
    const result = await this.tokensService.update(
      id,
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

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const result = await this.tokensService.remove(+id, req.user as User);
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
