import { Inject, Injectable, Logger } from '@nestjs/common';
import CompactEncrypt from 'jose/jwe/compact/encrypt';
import { KeyLike } from 'jose/jwk/from_key_like';

@Injectable()
export class JweService {
  private readonly publicKey: KeyLike;
  constructor(@Inject('JWE_ASYMMETRIC_KEYS') private keys: [KeyLike, KeyLike]) {
    this.publicKey = keys[1];
  }

  async sign(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const jwePayload = await new CompactEncrypt(encoder.encode(payload))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(this.publicKey);
    Logger.debug(`JWE payload (${jwePayload.length}): ${jwePayload}`);
    return jwePayload;
  }
}
