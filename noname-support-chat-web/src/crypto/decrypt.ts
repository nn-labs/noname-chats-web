import crypto from 'crypto';
import { getCryptEnv } from './helpers';

export function decrypt(encryptedData: any) {
  try {
    const { Algorithm, Iteration, KeyLen, Digest, CryptoSecret }: any =
      getCryptEnv();

    const Key = crypto.pbkdf2Sync(
      CryptoSecret,
      Buffer.from(encryptedData.salt, 'hex'),
      Iteration,
      KeyLen,
      Digest,
    );

    const decipher = crypto.createDecipheriv(
      Algorithm,
      Key,
      Buffer.from(encryptedData.iv, 'hex'),
    );
    return Buffer.concat([
      decipher.update(Buffer.from(encryptedData.data, 'hex')),
      decipher.final(),
    ]);
  } catch (e: any) {
    return new Error(e.message);
  }
}
