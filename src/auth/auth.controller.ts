import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JweAuthGuard } from './jwe-auth.guard';
import { UserCredentialsDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Body() body: UserCredentialsDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(JweAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
