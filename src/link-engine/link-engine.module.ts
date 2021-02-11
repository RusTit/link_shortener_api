import { Module } from '@nestjs/common';
import { LinkEngineService } from './link-engine.service';
import { LinkEngineController } from './link-engine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/Url.entity';
import { MappingEntity } from '../entities/Mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, MappingEntity])],
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
