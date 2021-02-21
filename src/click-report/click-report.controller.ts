import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ClickReportService } from './click-report.service';
import { CreateClickReportDto } from './dto/create-click-report.dto';
import { UpdateClickReportDto } from './dto/update-click-report.dto';

@Controller('click-report')
export class ClickReportController {
  constructor(private readonly clickReportService: ClickReportService) {}

  @Post()
  create(@Body() createClickReportDto: CreateClickReportDto) {
    return this.clickReportService.create(createClickReportDto);
  }

  @Get()
  findAll() {
    return this.clickReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clickReportService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClickReportDto: UpdateClickReportDto) {
    return this.clickReportService.update(+id, updateClickReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clickReportService.remove(+id);
  }
}
