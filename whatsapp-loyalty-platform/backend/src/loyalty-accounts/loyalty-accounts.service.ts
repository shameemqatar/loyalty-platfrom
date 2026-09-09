import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLoyaltyAccountDto } from './create-loyalty-account.dto.js';

import {
    ConflictException,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class LoyaltyAccountsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        businessId: number,
        createLoyaltyAccountDto: CreateLoyaltyAccountDto,
    ) {
        const customer =
            await this.prisma.db.orm.public.Customer.first({
                id: createLoyaltyAccountDto.customerId,
                businessId,
            });

        if (!customer) {
            return null;
        }

        const loyaltyProgram =
            await this.prisma.db.orm.public.LoyaltyProgram.first({
                id: createLoyaltyAccountDto.loyaltyProgramId,
                businessId,
            });

        if (!loyaltyProgram) {
            return null;
        }

        const existingAccount =
            await this.prisma.db.orm.public.LoyaltyAccount.first({
                customerId: createLoyaltyAccountDto.customerId,
                loyaltyProgramId:
                    createLoyaltyAccountDto.loyaltyProgramId,
            });

        if (existingAccount) {
            throw new ConflictException(
                'Loyalty account already exists for this customer and program.',
            );
        }

        return this.prisma.db.orm.public.LoyaltyAccount.create({
            customerId: createLoyaltyAccountDto.customerId,
            loyaltyProgramId:
                createLoyaltyAccountDto.loyaltyProgramId,
            points: 0,
        });
    }

    async findAll(businessId: number) {
        const customers =
            await this.prisma.db.orm.public.Customer
                .where({ businessId })
                .all();

        const accounts = [];

        for (const customer of customers) {
            const customerAccounts =
                await this.prisma.db.orm.public.LoyaltyAccount
                    .where({
                        customerId: customer.id,
                    })
                    .all();

            accounts.push(...customerAccounts);
        }

        return accounts;
    }

    async findOne(
        businessId: number,
        accountId: number,
    ) {
        const account =
            await this.prisma.db.orm.public.LoyaltyAccount.first({
                id: accountId,
            });

        if (!account) {
            return null;
        }

        const customer =
            await this.prisma.db.orm.public.Customer.first({
                id: account.customerId,
                businessId,
            });

        if (!customer) {
            return null;
        }

        return account;
    }
}