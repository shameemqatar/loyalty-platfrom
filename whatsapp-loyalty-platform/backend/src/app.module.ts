import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { BusinessesModule } from './businesses/businesses.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { LoyaltyProgramsModule } from './loyalty-programs/loyalty-programs.module.js';
import { LoyaltyAccountsModule } from './loyalty-accounts/loyalty-accounts.module.js';


@Module({
  imports: [
    PrismaModule,
    BusinessesModule,
    CustomersModule,
    LoyaltyProgramsModule,
    LoyaltyAccountsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}