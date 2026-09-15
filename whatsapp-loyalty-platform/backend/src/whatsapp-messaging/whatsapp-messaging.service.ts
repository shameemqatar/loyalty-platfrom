import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { WhatsAppTokenService } from '../whatsapp-accounts/whatsapp-token.service.js';
import { SendWhatsAppMessageDto } from './send-whatsapp-message.dto.js';
@Injectable()
export class WhatsAppMessagingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsappTokenService: WhatsAppTokenService,
  ) {}

  async sendTextMessage(
    businessId: number,
    dto: SendWhatsAppMessageDto,
  ) {
    const account =
      await this.prisma.db.orm.public.WhatsAppAccount.first({
        businessId,
      });

    if (!account) {
      throw new NotFoundException(
        'WhatsApp account not found for this business.',
      );
    }

    if (!account.isActive) {
      throw new BadRequestException(
        'WhatsApp account is inactive.',
      );
    }

    if (!account.accessTokenEncrypted) {
      throw new BadRequestException(
        'WhatsApp access token is not configured.',
      );
    }

    const accessToken =
      this.whatsappTokenService.decrypt(
        account.accessTokenEncrypted,
      );

    const apiVersion =
      process.env.WHATSAPP_GRAPH_API_VERSION;

    if (!apiVersion) {
      throw new InternalServerErrorException(
        'WHATSAPP_GRAPH_API_VERSION is not configured.',
      );
    }

    const url =
      `https://graph.facebook.com/${apiVersion}` +
      `/${account.phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: dto.to,
        type: 'text',
        text: {
          preview_url: false,
          body: dto.message,
        },
      }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new BadRequestException({
        message: 'WhatsApp API request failed.',
        details: responseBody,
      });
    }

    return {
      success: true,
      messageId:
        responseBody?.messages?.[0]?.id ?? null,
      recipient:
        responseBody?.contacts?.[0]?.wa_id ?? dto.to,
    };
  }
}