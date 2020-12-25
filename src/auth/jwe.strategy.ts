import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import compactDecrypt from 'jose/jwe/compact/decrypt';
import { KeyLike } from 'jose/jwk/from_key_like';

@Injectable()
export class JweStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('PRIVATE_ASYMMETRIC_KEY') private readonly privateKey: KeyLike,
  ) {
    super();
  }

  async validate(jwe?: string) {
    if (!jwe) {
      throw new UnauthorizedException();
    }
    try {
      const { plaintext } = await compactDecrypt(jwe, this.privateKey);
      const jsString = new TextDecoder('utf-8').decode(plaintext);
      return JSON.parse(jsString);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
