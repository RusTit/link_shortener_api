import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JweAuthGuard } from '../auth/jwe-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../entities/User.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  @Get(':id/activate')
  async activate(@Param('id') id: number) {
    const result = await this.usersService.activate(id);
    if (result) {
      return {
        ok: true,
        status: 'User was activated',
      };
    }
    return new BadRequestException({
      ok: false,
      status: `User wasn't activated`,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  @Get(':id/inactivate')
  async inactivate(@Param('id') id: number) {
    const result = await this.usersService.inActivate(id);
    if (result) {
      return {
        ok: true,
        status: 'User was inactivated',
      };
    }
    return new BadRequestException({
      ok: false,
      status: `User wasn't inactivated`,
    });
  }

  @Get('activation/:uuid')
  async activateByUrl(@Param('uuid') uuid: string) {
    const result = await this.usersService.activateByUuid(uuid);
    if (result) {
      return {
        ok: true,
        status: 'User was successfully activated',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: 'Activation url is invalid',
    });
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (result) {
      return {
        ok: true,
        status: 'User was created',
      };
    }
    throw new BadRequestException({
      ok: false,
      status: 'User exist',
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JweAuthGuard, RolesGuard)
  @ApiTags('admin')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
