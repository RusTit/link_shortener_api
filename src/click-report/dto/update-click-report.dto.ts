import { PartialType } from '@nestjs/mapped-types';
import { CreateClickReportDto } from './create-click-report.dto';

export class UpdateClickReportDto extends PartialType(CreateClickReportDto) {}
