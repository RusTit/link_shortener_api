import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import compactDecrypt from 'jose/jwe/compact/decrypt';
import parseJwk from 'jose/jwk/parse';
import * as fs from 'fs/promises';

@Injectable()
export class JweStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor() {
    super();
  }

  async validate(jwe?: string) {
    const privateKeyString = await fs.readFile('privateKey.json', {
      encoding: 'utf8',
    });
    const privateKey = await parseJwk(
      JSON.parse(privateKeyString),
      'RSA-OAEP-256',
    );
    if (!jwe) {
      throw new UnauthorizedException();
    }
    try {
      const { plaintext, protectedHeader } = await compactDecrypt(
        jwe,
        privateKey,
      );
      const jsString = new TextDecoder('utf-8').decode(plaintext);
      return JSON.parse(jsString);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
