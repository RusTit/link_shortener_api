import generateSecret from 'jose/util/generate_secret';
import generateKeyPair from 'jose/util/generate_key_pair';
import fromKeyLike, { JWK } from 'jose/jwk/from_key_like';
import * as fs from 'fs/promises';

export async function savePlain(fileName: string, key: JWK): Promise<void> {
  const dataStr = JSON.stringify(key);
  await fs.writeFile(fileName, dataStr);
}

export async function fileExist(fileName: string): Promise<boolean> {
  try {
    await fs.access(fileName);
    return true;
  } catch {
    return false;
  }
}

export async function generateSymmetricKey(): Promise<void> {
  const fileName = 'secretKey.json';
  if (await fileExist(fileName)) {
    return;
  }
  const secretKey = await generateSecret('HS256');
  const secretKeyPlain = await fromKeyLike(secretKey);
  await savePlain(fileName, secretKeyPlain);
}

export async function generateAsymmetricKeys(): Promise<void> {
  const privateKeyFileName = 'privateKey.json';
  const publicKeyFileName = 'publicKey.json';
  if (
    (await fileExist(publicKeyFileName)) &&
    (await fileExist(privateKeyFileName))
  ) {
    return;
  }
  const { publicKey, privateKey } = await generateKeyPair('PS256');
  const publicKeyPlain = await fromKeyLike(publicKey);
  await savePlain(publicKeyFileName, publicKeyPlain);
  const privateKeyPlain = await fromKeyLike(privateKey);
  await savePlain(privateKeyFileName, privateKeyPlain);
}

export async function run(): Promise<void> {
  await Promise.all([
    // generateSymmetricKey(),
    generateAsymmetricKeys(),
  ]);
}

run();
