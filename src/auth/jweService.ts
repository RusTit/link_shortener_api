import { Injectable, Logger } from '@nestjs/common';
import CompactEncrypt from 'jose/jwe/compact/encrypt';
import parseJwk from 'jose/jwk/parse';
import * as fs from 'fs/promises';

@Injectable()
export class JweService {
  async sign(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const publicKeyString = await fs.readFile('publicKey.json', {
      encoding: 'utf8',
    });
    const publicKey = await parseJwk(JSON.parse(publicKeyString), 'PS256');
    const jwePayload = await new CompactEncrypt(encoder.encode(payload))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(publicKey);
    Logger.debug(`JWE payload: ${jwePayload}`);
    return jwePayload;
  }
}
