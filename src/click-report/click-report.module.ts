import { Module } from '@nestjs/common';
import { ClickReportService } from './click-report.service';
import { ClickReportController } from './click-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import { MappingEntity } from '../entities/Mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClickReportEntity, MappingEntity])],
  controllers: [ClickReportController],
  providers: [ClickReportService],
})
export class ClickReportModule {}
