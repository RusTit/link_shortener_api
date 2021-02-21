import { Module } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { UserLevelController } from './user-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLevelEntity } from '../entities/UserLevel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLevelEntity])],
  controllers: [UserLevelController],
  providers: [UserLevelService],
})
export class UserLevelModule {}
