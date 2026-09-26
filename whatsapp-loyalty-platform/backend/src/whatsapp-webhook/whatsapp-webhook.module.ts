import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';

import { WhatsappWebhookController } from './whatsapp-webhook.controller.js';
import { WhatsappWebhookService } from './whatsapp-webhook.service.js';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    WhatsappWebhookController,
  ],
  providers: [
    WhatsappWebhookService,
  ],
})
export class WhatsappWebhookModule {}