import { Module } from '@nestjs/common';

import { WhatsAppAccountsController } from './whatsapp-accounts.controller.js';
import { WhatsAppAccountsService } from './whatsapp-accounts.service.js';

@Module({
  controllers: [WhatsAppAccountsController],
  providers: [WhatsAppAccountsService],
})
export class WhatsAppAccountsModule {}