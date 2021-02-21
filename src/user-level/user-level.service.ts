import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLevelEntity } from '../entities/UserLevel.entity';

@Injectable()
export class UserLevelService {
  constructor(
    @InjectRepository(UserLevelEntity)
    private userLevelEntityRepository: Repository<UserLevelEntity>,
  ) {}

  async findAll(): Promise<UserLevelEntity[]> {
    return this.userLevelEntityRepository.find();
  }

  async findOne(id: number): Promise<UserLevelEntity | undefined> {
    return this.userLevelEntityRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
    const existingEntity = await this.userLevelEntityRepository.findOne({
      where: {
        id,
      },
    });
    if (existingEntity) {
      await this.userLevelEntityRepository.remove(existingEntity);
      return true;
    }
    return false;
  }
}
