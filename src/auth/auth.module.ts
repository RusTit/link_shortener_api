import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JweService } from './jweService';
import { JweStrategy } from './jwe.strategy';
import { getASymmetricKeys } from './generateJWEToken';
import { KeyLike } from 'jose/jwk/from_key_like';
import { GoogleStrategy } from './google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JweService,
    JweStrategy,
    GoogleStrategy,
    {
      provide: 'JWE_ASYMMETRIC_KEYS',
      useFactory: async (): Promise<[KeyLike, KeyLike]> => {
        return await getASymmetricKeys();
      },
    },
  ],
})
export class AuthModule {}
