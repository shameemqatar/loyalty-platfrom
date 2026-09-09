import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module.js';
import { BusinessesModule } from './businesses/businesses.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { LoyaltyProgramsModule } from './loyalty-programs/loyalty-programs.module.js';
import { LoyaltyAccountsModule } from './loyalty-accounts/loyalty-accounts.module.js';
import { LoyaltyTransactionsModule } from './loyalty-transactions/loyalty-transactions.module.js';

@Module({
  imports: [
    PrismaModule,
    BusinessesModule,
    CustomersModule,
    LoyaltyProgramsModule,
    LoyaltyAccountsModule,
    LoyaltyTransactionsModule,
  ],
})
export class AppModule {}