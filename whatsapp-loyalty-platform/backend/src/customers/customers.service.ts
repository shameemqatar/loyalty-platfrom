import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCustomerDto } from './create-customer.dto.js';
import { UpdateCustomerDto } from './update-customer.dto.js';

@Injectable()
export class CustomersService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        businessId: number,
        createCustomerDto: CreateCustomerDto,
    ) {
        return this.prisma.db.orm.public.Customer.create({
            phone: createCustomerDto.phone,
            name: createCustomerDto.name ?? null,
            email: createCustomerDto.email ?? null,
            businessId,
        });
    }
    async findAll(businessId: number) {
        return this.prisma.db.orm.public.Customer
            .where({ businessId })
            .all();
    }
    async findOne(
        businessId: number,
        customerId: number,
    ) {
        return this.prisma.db.orm.public.Customer.first({
            id: customerId,
            businessId,
        });
    }
    async update(
        businessId: number,
        customerId: number,
        updateCustomerDto: UpdateCustomerDto,
    ) {
        const customer = await this.prisma.db.orm.public.Customer.first({
            id: customerId,
            businessId,
        });

        if (!customer) {
            return null;
        }

        return this.prisma.db.orm.public.Customer
            .where({
                id: customerId,
                businessId,
            })
            .update({
                ...updateCustomerDto,
            });
    }
    async remove(
        businessId: number,
        customerId: number,
    ) {
        const customer = await this.prisma.db.orm.public.Customer.first({
            id: customerId,
            businessId,
        });

        if (!customer) {
            return null;
        }


        return this.prisma.db.orm.public.Customer
            .where({
                id: customerId,
                businessId,
            })
            .delete();
    }
}