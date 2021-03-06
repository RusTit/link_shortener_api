import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Body,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JweAuthGuard } from './jwe-auth.guard';
import { AuthTokenDto, UserCredentialsDto } from './dtos';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/User.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOkResponse({
    description: 'Return JWT token',
    type: AuthTokenDto,
  })
  async login(
    @Req() req: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: UserCredentialsDto,
  ): Promise<AuthTokenDto> {
    return this.authService.login(req.user as User);
  }

  @ApiBearerAuth()
  @UseGuards(JweAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('google')
  @ApiTags('oauth2')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    Logger.debug('Google');
  }

  @Get('google/redirect')
  @ApiTags('oauth2')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req.user as User);
  }
}
