import generateSecret from 'jose/util/generate_secret';
import generateKeyPair from 'jose/util/generate_key_pair';
import fromKeyLike, { JWK } from 'jose/jwk/from_key_like';
import * as fs from 'fs/promises';

export async function savePlain(fileName: string, key: JWK): Promise<void> {
  const dataStr = JSON.stringify(key);
  await fs.writeFile(fileName, dataStr);
}

export async function generateSymmetricKey(): Promise<void> {
  const secretKey = await generateSecret('HS256');
  const secretKeyPlain = await fromKeyLike(secretKey);
  await savePlain('secretKey.json', secretKeyPlain);
}

export async function generateAsymmetricKeys(): Promise<void> {
  const { publicKey, privateKey } = await generateKeyPair('PS256');
  const publicKeyPlain = await fromKeyLike(publicKey);
  await savePlain('publicKey.json', publicKeyPlain);
  const privateKeyPlain = await fromKeyLike(privateKey);
  await savePlain('privateKey.json', privateKeyPlain);
}

export async function run(): Promise<void> {
  await Promise.all([
    // generateSymmetricKey(),
    generateAsymmetricKeys(),
  ]);
}

run();
