import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateWhatsAppAccountDto } from './create-whatsapp-account.dto.js';
import { UpdateWhatsAppAccountDto } from './update-whatsapp-account.dto.js';

@Injectable()
export class WhatsAppAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    businessId: number,
    createDto: CreateWhatsAppAccountDto,
  ) {
    const business = await this.prisma.db.orm.public.Business.first({
      id: businessId,
    });

    if (!business) {
      throw new NotFoundException('Business not found.');
    }

    const existingBusinessAccount =
      await this.prisma.db.orm.public.WhatsAppAccount.first({
        businessId,
      });

    if (existingBusinessAccount) {
      throw new ConflictException(
        'This business already has a WhatsApp account.',
      );
    }

    const existingPhoneNumber =
      await this.prisma.db.orm.public.WhatsAppAccount.first({
        phoneNumberId: createDto.phoneNumberId,
      });

    if (existingPhoneNumber) {
      throw new ConflictException(
        'This WhatsApp phone number is already connected.',
      );
    }

    const existingWaba =
      await this.prisma.db.orm.public.WhatsAppAccount.first({
        wabaId: createDto.wabaId,
      });

    if (existingWaba) {
      throw new ConflictException(
        'This WhatsApp Business Account is already connected.',
      );
    }

    return this.prisma.db.orm.public.WhatsAppAccount.create({
      businessId,
      phoneNumberId: createDto.phoneNumberId,
      wabaId: createDto.wabaId,
      displayPhoneNumber: createDto.displayPhoneNumber,
      isActive: createDto.isActive ?? true,
    });
  }

  async findAll(businessId: number) {
    const business = await this.prisma.db.orm.public.Business.first({
      id: businessId,
    });

    if (!business) {
      throw new NotFoundException('Business not found.');
    }

    return this.prisma.db.orm.public.WhatsAppAccount
      .where({
        businessId,
      })
      .all();
  }

  async findOne(
    businessId: number,
    id: number,
  ) {
    const account =
      await this.prisma.db.orm.public.WhatsAppAccount.first({
        id,
        businessId,
      });

    if (!account) {
      throw new NotFoundException(
        'WhatsApp account not found.',
      );
    }

    return account;
  }

  async update(
    businessId: number,
    id: number,
    updateDto: UpdateWhatsAppAccountDto,
  ) {
    await this.findOne(businessId, id);

    if (updateDto.phoneNumberId) {
      const existingPhoneNumber =
        await this.prisma.db.orm.public.WhatsAppAccount.first({
          phoneNumberId: updateDto.phoneNumberId,
        });

      if (
        existingPhoneNumber &&
        existingPhoneNumber.id !== id
      ) {
        throw new ConflictException(
          'This WhatsApp phone number is already connected.',
        );
      }
    }

    if (updateDto.wabaId) {
      const existingWaba =
        await this.prisma.db.orm.public.WhatsAppAccount.first({
          wabaId: updateDto.wabaId,
        });

      if (
        existingWaba &&
        existingWaba.id !== id
      ) {
        throw new ConflictException(
          'This WhatsApp Business Account is already connected.',
        );
      }
    }

    return this.prisma.db.orm.public.WhatsAppAccount
      .where({
        id,
        businessId,
      })
      .update({
        phoneNumberId: updateDto.phoneNumberId,
        wabaId: updateDto.wabaId,
        displayPhoneNumber: updateDto.displayPhoneNumber,
        isActive: updateDto.isActive,
      });
  }

  async remove(
    businessId: number,
    id: number,
  ) {
    await this.findOne(businessId, id);

    await this.prisma.db.orm.public.WhatsAppAccount
      .where({
        id,
        businessId,
      })
      .delete();

    return {
      message: 'WhatsApp account deleted successfully.',
    };
  }
}