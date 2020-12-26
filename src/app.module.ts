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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
    PassportModule.register({ session: false }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: process.env.REDIS_PORT
          ? Number.parseInt(process.env.REDIS_PORT)
          : 6379,
      },
    }),
    UsersModule,
    AuthModule,
    LinkEngineModule,
    ScheduleTasksModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
