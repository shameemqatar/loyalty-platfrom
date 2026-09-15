import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { WhatsAppAccountsModule } from '../whatsapp-accounts/whatsapp-accounts.module.js';

import { WhatsAppMessagingController } from './whatsapp-messaging.controller.js';
import { WhatsAppMessagingService } from './whatsapp-messaging.service.js';

@Module({
  imports: [
    PrismaModule,
    WhatsAppAccountsModule,
  ],
  controllers: [
    WhatsAppMessagingController,
  ],
  providers: [
    WhatsAppMessagingService,
  ],
})
export class WhatsAppMessagingModule {}