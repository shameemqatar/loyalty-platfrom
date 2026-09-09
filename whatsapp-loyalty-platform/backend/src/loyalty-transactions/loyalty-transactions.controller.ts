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