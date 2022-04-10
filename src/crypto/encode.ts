import crypto from 'crypto';
import { getCryptEnv } from './helpers';

export function encrypt(text: string): any {
  try {
    const { Algorithm, Iteration, KeyLen, Digest, CryptoSecret }: any =
      getCryptEnv();

    const salt = crypto.randomBytes(32);
    const KEY = crypto.pbkdf2Sync(
      CryptoSecret,
      salt,
      Iteration,
      KeyLen,
      Digest,
    );

    const IV = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(Algorithm, KEY, IV);

    const data = {
      encrypted: Buffer.concat([cipher.update(text), cipher.final()]),
    };

    return {
      data: data.encrypted.toString('hex'),
      salt: salt.toString('hex'),
      iv: IV.toString('hex'),
    };
  } catch (e: any) {
    return new Error(e.message);
  }
}
