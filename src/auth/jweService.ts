import { Injectable, Logger } from '@nestjs/common';
import CompactEncrypt from 'jose/jwe/compact/encrypt';
import parseJwk from 'jose/jwk/parse';

@Injectable()
export class JweService {
  async sign(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const publicKey = await parseJwk(
      {
        e: 'AQAB',
        n:
          'qpzYkTGRKSUcd12hZaJnYEKVLfdEsqu6HBAxZgRSvzLFj_zTSAEXjbf3fX47MPEHRw8NDcEXPjVOz84t4FTXYF2w2_LGWfp_myjV8pR6oUUncJjS7DhnUmTG5bpuK2HFXRMRJYz_iNR48xRJPMoY84jrnhdIFx8Tqv6w4ZHVyEvcvloPgwG3UjLidP6jmqbTiJtidVLnpQJRuFNFQJiluQXBZ1nOLC7raQshu7L9y0IatVU7vf0BPnmuSkcNNvmQkSta6ODQBPaL5-o5SW8H37vQjPDkrlJpreViNa3jqP5DB5HYUO-DMh4FegRv9gZWLDEvXpSd9A13YXCa9Q8K_w',
        kty: 'RSA',
      },
      'RSA-OAEP-256',
    );
    const jwePayload = await new CompactEncrypt(encoder.encode(payload))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(publicKey);
    Logger.debug(`JWE payload: ${jwePayload}`);
    return jwePayload;
  }
}
