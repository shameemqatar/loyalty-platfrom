import { Module } from '@nestjs/common';

import { WhatsAppAccountsController } from './whatsapp-accounts.controller.js';
import { WhatsAppAccountsService } from './whatsapp-accounts.service.js';
import { WhatsAppTokenService } from './whatsapp-token.service.js';

@Module({
  controllers: [WhatsAppAccountsController],
  providers: [
    WhatsAppAccountsService,
    WhatsAppTokenService,
  ],
})
export class WhatsAppAccountsModule {}