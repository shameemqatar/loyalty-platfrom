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

import { WhatsAppAccountsService } from './whatsapp-accounts.service.js';
import { CreateWhatsAppAccountDto } from './create-whatsapp-account.dto.js';
import { UpdateWhatsAppAccountDto } from './update-whatsapp-account.dto.js';

@Controller('businesses/:businessId/whatsapp-accounts')
export class WhatsAppAccountsController {
  constructor(
    private readonly whatsappAccountsService: WhatsAppAccountsService,
  ) {}

  @Post()
  create(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Body() createDto: CreateWhatsAppAccountDto,
  ) {
    return this.whatsappAccountsService.create(
      businessId,
      createDto,
    );
  }

  @Get()
  findAll(
    @Param('businessId', ParseIntPipe) businessId: number,
  ) {
    return this.whatsappAccountsService.findAll(businessId);
  }

  @Get(':id')
  findOne(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.whatsappAccountsService.findOne(
      businessId,
      id,
    );
  }

  @Patch(':id')
  update(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateWhatsAppAccountDto,
  ) {
    return this.whatsappAccountsService.update(
      businessId,
      id,
      updateDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.whatsappAccountsService.remove(
      businessId,
      id,
    );
  }
}