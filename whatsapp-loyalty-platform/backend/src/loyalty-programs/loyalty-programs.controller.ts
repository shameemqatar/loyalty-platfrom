import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { LoyaltyProgramsService } from './loyalty-programs.service.js';
import { CreateLoyaltyProgramDto } from './create-loyalty-program.dto.js';
import { UpdateLoyaltyProgramDto } from './update-loyalty-program.dto.js';

@Controller('businesses/:businessId/loyalty-programs')
export class LoyaltyProgramsController {
  constructor(
    private readonly loyaltyProgramsService: LoyaltyProgramsService,
  ) {}

  @Post()
  create(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ) {
    return this.loyaltyProgramsService.create(
      businessId,
      createLoyaltyProgramDto,
    );
  }

  @Get()
  findAll(
    @Param('businessId', ParseIntPipe) businessId: number,
  ) {
    return this.loyaltyProgramsService.findAll(businessId);
  }

  @Get(':programId')
  findOne(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    return this.loyaltyProgramsService.findOne(
      businessId,
      programId,
    );
  }

  @Patch(':programId')
  update(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('programId', ParseIntPipe) programId: number,
    @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    return this.loyaltyProgramsService.update(
      businessId,
      programId,
      updateLoyaltyProgramDto,
    );
  }

  @Delete(':programId')
  remove(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    return this.loyaltyProgramsService.remove(
      businessId,
      programId,
    );
  }
}