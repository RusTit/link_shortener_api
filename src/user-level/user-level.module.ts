import { Module } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { UserLevelController } from './user-level.controller';

@Module({
  controllers: [UserLevelController],
  providers: [UserLevelService]
})
export class UserLevelModule {}
