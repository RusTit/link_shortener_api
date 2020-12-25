import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JweService } from './jweService';
import { JweStrategy } from './jwe.strategy';
import { getASymmetricKeys } from './generateJWEToken';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JweService,
    JweStrategy,
    {
      provide: 'PRIVATE_ASYMMETRIC_KEY',
      useFactory: async () => {
        const [key] = await getASymmetricKeys();
        return key;
      },
    },
    {
      provide: 'PUBLIC_ASYMMETRIC_KEY',
      useFactory: async () => {
        const [, key] = await getASymmetricKeys();
        return key;
      },
    },
  ],
})
export class AuthModule {}
