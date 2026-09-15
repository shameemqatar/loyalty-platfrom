import { Module } from '@nestjs/common';

import { WhatsappWebhookController } from './whatsapp-webhook.controller.js';
import { WhatsappWebhookService } from './whatsapp-webhook.service.js';

@Module({
  controllers: [
    WhatsappWebhookController,
  ],
  providers: [
    WhatsappWebhookService,
  ],
})
export class WhatsappWebhookModule {}