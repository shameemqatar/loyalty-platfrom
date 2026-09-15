import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { WhatsAppMessagingService } from './whatsapp-messaging.service.js';
import { SendWhatsAppMessageDto } from './send-whatsapp-message.dto.js';
@Controller('businesses/:businessId/whatsapp/messages')
export class WhatsAppMessagingController {
  constructor(
    private readonly whatsappMessagingService: WhatsAppMessagingService,
  ) {}

  @Post()
  sendTextMessage(
    @Param('businessId', ParseIntPipe)
    businessId: number,

    @Body()
    dto: SendWhatsAppMessageDto,
  ) {
    return this.whatsappMessagingService.sendTextMessage(
      businessId,
      dto,
    );
  }
}