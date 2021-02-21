import { Injectable } from '@nestjs/common';
import { CreateClickReportDto } from './dto/create-click-report.dto';
import { UpdateClickReportDto } from './dto/update-click-report.dto';

@Injectable()
export class ClickReportService {
  create(createClickReportDto: CreateClickReportDto) {
    return 'This action adds a new clickReport';
  }

  findAll() {
    return `This action returns all clickReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clickReport`;
  }

  update(id: number, updateClickReportDto: UpdateClickReportDto) {
    return `This action updates a #${id} clickReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} clickReport`;
  }
}
