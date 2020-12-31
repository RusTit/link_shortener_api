import { Injectable, Logger } from '@nestjs/common';
import { JweService } from './jweService';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { JwePayload } from './jwe.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jweService: JweService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<boolean | User> {
    const cleanEmail = username.trim().toLowerCase();
    const userExist = await this.userRepository.findOne({
      where: {
        email: cleanEmail,
      },
    });
    if (!userExist) {
      Logger.debug(`User: ${cleanEmail} didn't registered`);
      return false;
    }
    if (!userExist.is_active) {
      Logger.debug(`User: ${cleanEmail} is not active yet`);
      return false;
    }
    const passwordValid = await userExist.isPasswordValid(password);
    if (!passwordValid) {
      Logger.debug(`User: ${cleanEmail} password is invalid`);
      return false;
    }
    return userExist;
  }

  async login(user: User) {
    const payload: JwePayload = { id: user.id, timestamp: new Date().toJSON() };
    const payloadStr = JSON.stringify(payload);
    const accessToken = await this.jweService.sign(payloadStr);
    return {
      access_token: accessToken,
    };
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
