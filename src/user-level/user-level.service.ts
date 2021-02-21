import { Injectable } from '@nestjs/common';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';

@Injectable()
export class UserLevelService {
  create(createUserLevelDto: CreateUserLevelDto) {
    return 'This action adds a new userLevel';
  }

  findAll() {
    return `This action returns all userLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLevel`;
  }

  update(id: number, updateUserLevelDto: UpdateUserLevelDto) {
    return `This action updates a #${id} userLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLevel`;
  }
}
