import { Inject, Injectable, Logger } from '@nestjs/common';
import CompactEncrypt from 'jose/jwe/compact/encrypt';
import { KeyLike } from 'jose/jwk/from_key_like';

@Injectable()
export class JweService {
  constructor(
    @Inject('PUBLIC_ASYMMETRIC_KEY') private readonly publicKey: KeyLike,
  ) {}

  async sign(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const jwePayload = await new CompactEncrypt(encoder.encode(payload))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(this.publicKey);
    Logger.debug(`JWE payload: ${jwePayload}`);
    return jwePayload;
  }
}
