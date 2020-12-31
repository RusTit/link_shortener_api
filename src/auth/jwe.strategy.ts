import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import compactDecrypt from 'jose/jwe/compact/decrypt';
import { KeyLike } from 'jose/jwk/from_key_like';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

export class JwePayload {
  id!: number;
  timestamp!: string;
}

@Injectable()
export class JweStrategy extends PassportStrategy(Strategy, 'bearer') {
  private readonly privateKey: KeyLike;
  constructor(
    @Inject('JWE_ASYMMETRIC_KEYS') private keys: [KeyLike, KeyLike],
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
    this.privateKey = keys[0];
  }

  async validate(jwe?: string): Promise<User> {
    if (!jwe) {
      throw new UnauthorizedException();
    }
    let userExist: User | undefined;
    try {
      const { plaintext } = await compactDecrypt(jwe, this.privateKey);
      const jsString = new TextDecoder('utf-8').decode(plaintext);
      const data: JwePayload = JSON.parse(jsString);
      userExist = await this.userRepository.findOne({
        where: {
          id: data.id,
        },
      });
    } catch (e) {
      Logger.error(`Jwe strategy error: ${e.message}`);
      throw new BadRequestException();
    }
    if (!userExist) {
      throw new BadRequestException({
        ok: false,
        status: 'Invalid id in the jwe payload',
      });
    }
    if (!userExist.is_active) {
      throw new BadRequestException({
        ok: false,
        status: 'User is not activated',
      });
    }
    return userExist;
  }
}
