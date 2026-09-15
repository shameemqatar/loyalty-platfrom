import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class WhatsappWebhookService {
  verifyWebhook(
    mode: string,
    verifyToken: string,
    challenge: string,
    response: Response,
  ) {
    const expectedToken =
      process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

    if (!expectedToken) {
      throw new Error(
        'WHATSAPP_WEBHOOK_VERIFY_TOKEN is not configured.',
      );
    }

    if (
      mode === 'subscribe' &&
      verifyToken === expectedToken
    ) {
      return response.status(200).send(challenge);
    }

    throw new UnauthorizedException(
      'Webhook verification failed.',
    );
  }
}