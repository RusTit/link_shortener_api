import { Injectable } from '@nestjs/common';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/Token.entity';
import { User } from '../entities/User.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}
  async create(user: User): Promise<boolean> {
    const token = new Token();
    token.user = user;
    await this.tokenRepository.save(token);
    return true;
  }

  async findAll(user: User): Promise<Token[]> {
    return this.tokenRepository.find({
      where: {
        user,
      },
    });
  }

  async findOne(id: number, user: User): Promise<Token | undefined> {
    return this.tokenRepository.findOne({
      where: {
        user,
        id,
      },
    });
  }

  async update(
    id: number,
    user: User,
    updateTokenDto: UpdateTokenDto,
  ): Promise<boolean> {
    const tokenExist = await this.tokenRepository.findOne({
      where: {
        id,
        user,
      },
    });
    if (!tokenExist) {
      return false;
    }
    tokenExist.is_active = updateTokenDto.is_active;
    await this.tokenRepository.save(tokenExist);
    return true;
  }

  async remove(id: number, user: User): Promise<boolean> {
    const tokenExist = await this.tokenRepository.findOne({
      where: {
        id,
        user,
      },
    });
    if (!tokenExist) {
      return false;
    }
    await this.tokenRepository.remove(tokenExist);
    return true;
  }
}
