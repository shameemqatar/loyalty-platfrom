import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import { LoyaltyTransactionsService } from './loyalty-transactions.service.js';
import { CreateLoyaltyTransactionDto } from './create-loyalty-transaction.dto.js';
import { PointsOperationDto } from './points-operation.dto.js';

@Controller('businesses/:businessId/loyalty-transactions')
export class LoyaltyTransactionsController {
    constructor(
        private readonly loyaltyTransactionsService: LoyaltyTransactionsService,
    ) { }

    @Post()
    create(
        @Param('businessId', ParseIntPipe) businessId: number,
        @Body()
        createLoyaltyTransactionDto: CreateLoyaltyTransactionDto,
    ) {
        return this.loyaltyTransactionsService.create(
            businessId,
            createLoyaltyTransactionDto,
        );
    }

    @Get()
    findAll(
        @Param('businessId', ParseIntPipe) businessId: number,
    ) {
        return this.loyaltyTransactionsService.findAll(
            businessId,
        );
    }


    @Post('accounts/:accountId/earn')
earn(
  @Param('businessId', ParseIntPipe) businessId: number,
  @Param('accountId', ParseIntPipe) accountId: number,
  @Body() pointsOperationDto: PointsOperationDto,
) {
  return this.loyaltyTransactionsService.earn(
    businessId,
    accountId,
    pointsOperationDto,
  );
}

@Post('accounts/:accountId/redeem')
redeem(
  @Param('businessId', ParseIntPipe) businessId: number,
  @Param('accountId', ParseIntPipe) accountId: number,
  @Body() pointsOperationDto: PointsOperationDto,
) {
  return this.loyaltyTransactionsService.redeem(
    businessId,
    accountId,
    pointsOperationDto,
  );
}

    @Get(':transactionId')
    findOne(
        @Param('businessId', ParseIntPipe) businessId: number,
        @Param('transactionId', ParseIntPipe)
        transactionId: number,
    ) {
        return this.loyaltyTransactionsService.findOne(
            businessId,
            transactionId,
        );
    }
}