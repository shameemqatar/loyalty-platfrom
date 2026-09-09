import { Module } from '@nestjs/common';

import { LoyaltyTransactionsController } from './loyalty-transactions.controller.js';
import { LoyaltyTransactionsService } from './loyalty-transactions.service.js';

@Module({
  controllers: [LoyaltyTransactionsController],
  providers: [LoyaltyTransactionsService],
})
export class LoyaltyTransactionsModule {}