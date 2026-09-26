import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import type { Response } from 'express';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class WhatsappWebhookService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    verifyWebhook(
        mode: string,
        verifyToken: string,
        challenge: string,
        response: Response,
    ) {
        const expectedToken =
            process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

        if (!expectedToken) {
            throw new Error(
                'WHATSAPP_WEBHOOK_VERIFY_TOKEN is not configured.',
            );
        }

        if (
            mode === 'subscribe' &&
            verifyToken === expectedToken
        ) {
            return response.status(200).send(challenge);
        }

        throw new UnauthorizedException(
            'Webhook verification failed.',
        );
    }

    async receiveWebhook(body: any) {
        console.log(
            'WhatsApp webhook received:',
            JSON.stringify(body, null, 2),
        );

        const value =
            body?.entry?.[0]?.changes?.[0]?.value;

        if (!value) {
            console.log(
                'No WhatsApp event value found.',
            );

            return {
                success: true,
                event: 'ignored',
            };
        }

        const metadata = value.metadata;

        const contact =
            value.contacts?.[0];

        const message =
            value.messages?.[0];

        if (!message) {
            console.log(
                'Webhook event does not contain a customer message.',
            );

            return {
                success: true,
                event: 'non_message',
            };
        }

        const phoneNumberId =
            metadata?.phone_number_id ?? null;

        const customerPhone =
            message.from ?? null;

        const customerName =
            contact?.profile?.name ?? null;

        const messageId =
            message.id ?? null;

        const messageType =
            message.type ?? null;

        const messageText =
            message.type === 'text'
                ? message.text?.body ?? null
                : null;

        console.log('--- WhatsApp Message ---');
        console.log(
            'Phone Number ID:',
            phoneNumberId,
        );
        console.log(
            'Customer Phone:',
            customerPhone,
        );
        console.log(
            'Customer Name:',
            customerName,
        );
        console.log(
            'Message ID:',
            messageId,
        );
        console.log(
            'Message Type:',
            messageType,
        );
        console.log(
            'Message Text:',
            messageText,
        );
        console.log('------------------------');

        if (!phoneNumberId) {
            throw new NotFoundException(
                'WhatsApp phone number ID not found in webhook.',
            );
        }

        if (!customerPhone) {
            throw new NotFoundException(
                'Customer phone number not found in webhook.',
            );
        }

        const whatsappAccount =
            await this.prisma.db.orm.public.WhatsAppAccount.first({
                phoneNumberId,
            });

        if (!whatsappAccount) {
            throw new NotFoundException(
                'WhatsApp account not found for this phone number.',
            );
        }

        const businessId =
            whatsappAccount.businessId;

        const normalizePhone = (phone: string) =>
            phone.replace(/\D/g, '');

        const normalizedCustomerPhone =
            normalizePhone(customerPhone);

        const businessCustomers =
            await this.prisma.db.orm.public.Customer
                .where({ businessId })
                .all();

        const customer =
            businessCustomers.find(
                (item) =>
                    normalizePhone(item.phone) ===
                    normalizedCustomerPhone,
            );

        console.log(
            'Business ID:',
            businessId,
        );

        console.log(
            'Customer ID:',
            customer?.id ?? null,
        );

        return {
            success: true,
            event: 'message_received',
            data: {
                phoneNumberId,
                businessId,
                customerId: customer?.id ?? null,
                customerPhone: normalizedCustomerPhone,
                customerName,
                messageId,
                messageType,
                messageText,
            },
        };
    }
}