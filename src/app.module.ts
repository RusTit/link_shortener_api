import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LinkEngineModule } from './link-engine/link-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    PassportModule.register({ session: false }),
    UsersModule,
    AuthModule,
    LinkEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
