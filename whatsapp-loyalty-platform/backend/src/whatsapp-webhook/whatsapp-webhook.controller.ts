import {
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { WhatsappWebhookService } from './whatsapp-webhook.service.js';

@Controller('webhooks/whatsapp')
export class WhatsappWebhookController {
  constructor(
    private readonly whatsappWebhookService: WhatsappWebhookService,
  ) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
    @Res() response: Response,
  ) {
    return this.whatsappWebhookService.verifyWebhook(
      mode,
      verifyToken,
      challenge,
      response,
    );
  }
}