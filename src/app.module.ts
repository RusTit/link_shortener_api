import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { LinkEngineModule } from './link-engine/link-engine.module';
import { ScheduleTasksModule } from './schedule-tasks/schedule-tasks.module';
import { PaymentsModule } from './payments/payments.module';
import { BullModule } from '@nestjs/bull';
import { TokensModule } from './tokens/tokens.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
    PassportModule.register({ session: false }),
    BullModule.forRoot({
      redis: process.env.REDIS_URL ?? 'redis://localhost:6379',
    }),
    UsersModule,
    AuthModule,
    LinkEngineModule,
    ScheduleTasksModule,
    PaymentsModule,
    TokensModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
