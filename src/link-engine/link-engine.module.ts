import { Module } from '@nestjs/common';
import { LinkEngineService } from './link-engine.service';
import { LinkEngineController } from './link-engine.controller';

@Module({
  providers: [
    LinkEngineService,
    {
      provide: 'LINK_ENGINE_URL',
      useFactory: () => {
        return process.env.LINK_ENGINE_URL ?? 'http://192.99.10.113:11000';
      },
    },
  ],
  exports: [LinkEngineModule],
  controllers: [LinkEngineController],
})
export class LinkEngineModule {}
