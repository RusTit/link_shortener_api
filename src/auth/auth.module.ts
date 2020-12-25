import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JweService } from './jweService';
import { JweStrategy } from './jwe.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JweService, JweStrategy],
})
export class AuthModule {}
