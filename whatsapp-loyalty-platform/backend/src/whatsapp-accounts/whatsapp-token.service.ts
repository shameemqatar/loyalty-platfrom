import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'node:crypto';

@Injectable()
export class WhatsAppTokenService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor() {
    const encryptionKey = process.env.WHATSAPP_TOKEN_ENCRYPTION_KEY;

    if (!encryptionKey) {
      throw new Error(
        'WHATSAPP_TOKEN_ENCRYPTION_KEY is not configured.',
      );
    }

    this.key = Buffer.from(encryptionKey, 'hex');

    if (this.key.length !== 32) {
      throw new Error(
        'WHATSAPP_TOKEN_ENCRYPTION_KEY must be exactly 32 bytes (64 hexadecimal characters).',
      );
    }
  }

  encrypt(token: string): string {
    const iv = randomBytes(12);

    const cipher = createCipheriv(
      this.algorithm,
      this.key,
      iv,
    );

    const encrypted = Buffer.concat([
      cipher.update(token, 'utf8'),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return [
      iv.toString('hex'),
      authTag.toString('hex'),
      encrypted.toString('hex'),
    ].join(':');
  }

  decrypt(encryptedToken: string): string {
    try {
      const [ivHex, authTagHex, encryptedHex] =
        encryptedToken.split(':');

      if (!ivHex || !authTagHex || !encryptedHex) {
        throw new Error('Invalid encrypted token format.');
      }

      const decipher = createDecipheriv(
        this.algorithm,
        this.key,
        Buffer.from(ivHex, 'hex'),
      );

      decipher.setAuthTag(
        Buffer.from(authTagHex, 'hex'),
      );

      const decrypted = Buffer.concat([
        decipher.update(
          Buffer.from(encryptedHex, 'hex'),
        ),
        decipher.final(),
      ]);

      return decrypted.toString('utf8');
    } catch {
      throw new BadRequestException(
        'Unable to decrypt WhatsApp access token.',
      );
    }
  }
}