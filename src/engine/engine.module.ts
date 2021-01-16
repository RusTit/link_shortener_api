import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';

@Module({
  controllers: [EngineController],
  providers: [EngineService],
})
export class EngineModule {}
