import { Injectable } from '@nestjs/common';
import { JweService } from './jweService';

@Injectable()
export class AuthService {
  constructor(private readonly jweService: JweService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = {
      username,
      password,
      id: 1,
    };
    return user;
  }

  async login(user: any) {
    const payload = { id: user.id, timestamp: new Date() };
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
