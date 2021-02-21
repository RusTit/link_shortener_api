import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../entities/User.entity';

@Controller('user-level')
@ApiTags('clicks-levels', 'admin')
@UseGuards(JweAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Get()
  findAll() {
    return this.userLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLevelService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLevelService.remove(+id);
  }
}
