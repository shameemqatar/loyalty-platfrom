import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBusinessDto } from './create-business.dto.js';
import { UpdateBusinessDto } from './update-business.dto.js';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBusinessDto: CreateBusinessDto) {
    return this.prisma.db.orm.public.Business.create({
      name: createBusinessDto.name,
      slug: createBusinessDto.slug,
      email: createBusinessDto.email ?? null,
      phone: createBusinessDto.phone ?? null,
    });
  }

  async findAll() {
    return this.prisma.db.orm.public.Business.all();
  }

 async findOne(id: number) {
  return this.prisma.db.orm.public.Business.first({ id });
}

async update(
  id: number,
  updateBusinessDto: UpdateBusinessDto,
) {
  return this.prisma.db.orm.public.Business
    .where({ id })
    .update({
      ...updateBusinessDto,
    });
}
async remove(id: number) {
  return this.prisma.db.orm.public.Business
    .where({ id })
    .delete();
}
}