import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async activate(id: number): Promise<boolean> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userExist) {
      return false;
    }
    userExist.is_active = true;
    userExist.activation_token = null;
    await this.userRepository.save(userExist);
    return true;
  }

  async inActivate(id: number): Promise<boolean> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userExist) {
      return false;
    }
    userExist.is_active = false;
    userExist.activation_token = uuidv4();
    await this.userRepository.save(userExist);
    return true;
  }

  async activateByUuid(uuid: string): Promise<boolean> {
    const userExist = await this.userRepository.findOne({
      where: {
        activation_token: uuid,
      },
    });
    if (!userExist) {
      return false;
    }
    userExist.activation_token = null;
    userExist.is_active = true;
    await this.userRepository.save(userExist);
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const cleanEmail = createUserDto.email.trim().toLowerCase();
    const userExist = await this.userRepository.findOne({
      where: {
        email: cleanEmail,
      },
    });
    if (userExist) {
      return false;
    }
    const userEntity = new User();
    userEntity.email = cleanEmail;
    await userEntity.setPassword(createUserDto.password);
    await this.userRepository.save(userEntity);
    return true;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userExist) {
      return false;
    }
    userExist.email = updateUserDto.email.trim().toLowerCase();
    await userExist.setPassword(updateUserDto.password);
    await this.userRepository.save(userExist);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userExist) {
      return false;
    }
    await this.userRepository.remove(userExist);
    return true;
  }
}
