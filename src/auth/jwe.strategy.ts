import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JweStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
