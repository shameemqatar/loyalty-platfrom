import { Module } from '@nestjs/common';
import { LoyaltyAccountsController } from './loyalty-accounts.controller.js';
import { LoyaltyAccountsService } from './loyalty-accounts.service.js';

@Module({
  controllers: [LoyaltyAccountsController],
  providers: [LoyaltyAccountsService],
})
export class LoyaltyAccountsModule {}