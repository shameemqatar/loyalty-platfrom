import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { LoyaltyAccountsService } from './loyalty-accounts.service.js';
import { CreateLoyaltyAccountDto } from './create-loyalty-account.dto.js';

@Controller('businesses/:businessId/loyalty-accounts')
export class LoyaltyAccountsController {
  constructor(
    private readonly loyaltyAccountsService: LoyaltyAccountsService,
  ) {}

  @Post()
  create(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Body() createLoyaltyAccountDto: CreateLoyaltyAccountDto,
  ) {
    return this.loyaltyAccountsService.create(
      businessId,
      createLoyaltyAccountDto,
    );
  }

  @Get()
  findAll(
    @Param('businessId', ParseIntPipe) businessId: number,
  ) {
    return this.loyaltyAccountsService.findAll(businessId);
  }

  @Get(':accountId')
  findOne(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
  ) {
    return this.loyaltyAccountsService.findOne(
      businessId,
      accountId,
    );
  }
}