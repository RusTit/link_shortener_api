import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';

@Controller('user-level')
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Post()
  create(@Body() createUserLevelDto: CreateUserLevelDto) {
    return this.userLevelService.create(createUserLevelDto);
  }

  @Get()
  findAll() {
    return this.userLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLevelService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserLevelDto: UpdateUserLevelDto) {
    return this.userLevelService.update(+id, updateUserLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLevelService.remove(+id);
  }
}
