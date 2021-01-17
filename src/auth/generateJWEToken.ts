import generateKeyPair from 'jose/util/generate_key_pair';
import fromKeyLike, { JWK, KeyLike } from 'jose/jwk/from_key_like';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import parseJwk from 'jose/jwk/parse';

export async function savePlain(fileName: string, key: JWK): Promise<void> {
  const dataStr = JSON.stringify(key);
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, dataStr, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function loadKey(fileName: string): Promise<KeyLike | null> {
  try {
    Logger.debug(`Try to load key from ${fileName}`);
    const contentString: string = await new Promise((resolve, reject) => {
      fs.readFile(
        fileName,
        {
          encoding: 'utf8',
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
    const contentObject = JSON.parse(contentString);
    const keyLike = await parseJwk(contentObject, 'PS256');
    Logger.debug(`Key from ${fileName} was successfully loaded`);
    return keyLike;
  } catch {
    Logger.debug('Cannot load key from fs');
  }
  return null;
}

const privateKeyFileName = 'privateKey.json';
const publicKeyFileName = 'publicKey.json';
export async function getASymmetricKeys(): Promise<[KeyLike, KeyLike]> {
  const [existingPrivateKey, existingPubKey] = await Promise.all([
    loadKey(privateKeyFileName),
    loadKey(publicKeyFileName),
  ]);
  if (existingPrivateKey && existingPubKey) {
    return [existingPrivateKey, existingPubKey];
  }
  return generateAsymmetricKeys();
}

export async function generateAsymmetricKeys(): Promise<[KeyLike, KeyLike]> {
  Logger.debug('Generating new keys');
  const { publicKey, privateKey } = await generateKeyPair('PS256');
  Logger.debug('Saving keys into json files');
  const publicKeyPlain = await fromKeyLike(publicKey);
  const privateKeyPlain = await fromKeyLike(privateKey);
  await savePlain(publicKeyFileName, publicKeyPlain);
  await savePlain(privateKeyFileName, privateKeyPlain);
  return [privateKey, publicKey];
}
