import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module.js';

import { BusinessesModule } from './businesses/businesses.module.js';

import { CustomersModule } from './customers/customers.module.js';

import { LoyaltyProgramsModule } from './loyalty-programs/loyalty-programs.module.js';

import { LoyaltyAccountsModule } from './loyalty-accounts/loyalty-accounts.module.js';

import { LoyaltyTransactionsModule } from './loyalty-transactions/loyalty-transactions.module.js';

import { WhatsAppAccountsModule } from './whatsapp-accounts/whatsapp-accounts.module.js';

import { WhatsAppMessagingModule } from './whatsapp-messaging/whatsapp-messaging.module.js';
import { WhatsappWebhookModule } from './whatsapp-webhook/whatsapp-webhook.module.js';

@Module({
  imports: [
    PrismaModule,
    BusinessesModule,
    CustomersModule,
    LoyaltyProgramsModule,
    LoyaltyAccountsModule,
    LoyaltyTransactionsModule,
    WhatsAppAccountsModule,
    WhatsAppMessagingModule,
    WhatsappWebhookModule,
  ],
})
export class AppModule { }