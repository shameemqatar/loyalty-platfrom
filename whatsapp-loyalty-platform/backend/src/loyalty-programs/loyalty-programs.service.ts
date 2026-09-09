import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLoyaltyProgramDto } from './create-loyalty-program.dto.js';
import { UpdateLoyaltyProgramDto } from './update-loyalty-program.dto.js';

@Injectable()
export class LoyaltyProgramsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    businessId: number,
    createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ) {
    return this.prisma.db.orm.public.LoyaltyProgram.create({
      name: createLoyaltyProgramDto.name,
      description: createLoyaltyProgramDto.description ?? null,
      pointsPerCurrencyUnit:
        createLoyaltyProgramDto.pointsPerCurrencyUnit ?? 1,
      businessId,
    });
  }

  async findAll(businessId: number) {
    return this.prisma.db.orm.public.LoyaltyProgram
      .where({ businessId })
      .all();
  }

  async findOne(
    businessId: number,
    programId: number,
  ) {
    return this.prisma.db.orm.public.LoyaltyProgram.first({
      id: programId,
      businessId,
    });
  }

  async update(
    businessId: number,
    programId: number,
    updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    const program =
      await this.prisma.db.orm.public.LoyaltyProgram.first({
        id: programId,
        businessId,
      });

    if (!program) {
      return null;
    }

    return this.prisma.db.orm.public.LoyaltyProgram
      .where({
        id: programId,
        businessId,
      })
      .update({
        ...updateLoyaltyProgramDto,
      });
  }

  async remove(
    businessId: number,
    programId: number,
  ) {
    const program =
      await this.prisma.db.orm.public.LoyaltyProgram.first({
        id: programId,
        businessId,
      });

    if (!program) {
      return null;
    }

    return this.prisma.db.orm.public.LoyaltyProgram
      .where({
        id: programId,
        businessId,
      })
      .delete();
  }
}
