import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JweAuthGuard } from './jwe-auth.guard';
import { AuthTokenDto, UserCredentialsDto } from './dtos';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JweAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
