import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateLoyaltyTransactionDto } from './create-loyalty-transaction.dto.js';
import { PointsOperationDto } from './points-operation.dto.js';
import { LoyaltyTransactionType } from './loyalty-transaction-type.enum.js';

@Injectable()
export class LoyaltyTransactionsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
  businessId: number,
  createLoyaltyTransactionDto: CreateLoyaltyTransactionDto,
) {
  return this.prisma.db.transaction(async (tx) => {
    const account = await tx.orm.public.LoyaltyAccount.first({
      id: createLoyaltyTransactionDto.loyaltyAccountId,
    });

    if (!account) {
      throw new NotFoundException('Loyalty account not found.');
    }

    const customer = await tx.orm.public.Customer.first({
      id: account.customerId,
      businessId,
    });

    if (!customer) {
      throw new NotFoundException(
        'Loyalty account does not belong to this business.',
      );
    }

    if (createLoyaltyTransactionDto.points === 0) {
      throw new BadRequestException(
        'Transaction points cannot be zero.',
      );
    }

    if (
      createLoyaltyTransactionDto.type === LoyaltyTransactionType.EARN &&
      createLoyaltyTransactionDto.points < 0
    ) {
      throw new BadRequestException(
        'EARN transactions must have positive points.',
      );
    }

    if (
      createLoyaltyTransactionDto.type === LoyaltyTransactionType.REDEEM &&
      createLoyaltyTransactionDto.points > 0
    ) {
      throw new BadRequestException(
        'REDEEM transactions must have negative points.',
      );
    }

    const newBalance =
      account.points + createLoyaltyTransactionDto.points;

    if (newBalance < 0) {
      throw new BadRequestException(
        'Insufficient loyalty points.',
      );
    }

    const transaction =
      await tx.orm.public.LoyaltyTransaction.create({
        points: createLoyaltyTransactionDto.points,
        type: createLoyaltyTransactionDto.type,
        description: createLoyaltyTransactionDto.description,
        loyaltyAccountId:
          createLoyaltyTransactionDto.loyaltyAccountId,
      });

    await tx.orm.public.LoyaltyAccount
      .where({
        id: createLoyaltyTransactionDto.loyaltyAccountId,
      })
      .update({
        points: newBalance,
      });

    return transaction;
  });
}
    async findAll(businessId: number) {
        const customers =
            await this.prisma.db.orm.public.Customer
                .where({ businessId })
                .all();

        const customerIds = customers.map(
            (customer) => customer.id,
        );

        if (customerIds.length === 0) {
            return [];
        }

        const accounts: {
            id: number;
            customerId: number;
        }[] = [];

        for (const customerId of customerIds) {
            const customerAccounts =
                await this.prisma.db.orm.public.LoyaltyAccount
                    .where({
                        customerId,
                    })
                    .all();

            accounts.push(...customerAccounts);
        }

        const transactions = [];

        for (const account of accounts) {
            const accountTransactions =
                await this.prisma.db.orm.public.LoyaltyTransaction
                    .where({
                        loyaltyAccountId: account.id,
                    })
                    .all();

            transactions.push(...accountTransactions);
        }

        return transactions;
    }

    async findOne(
        businessId: number,
        transactionId: number,
    ) {
        const transaction =
            await this.prisma.db.orm.public.LoyaltyTransaction.first({
                id: transactionId,
            });

        if (!transaction) {
            return null;
        }

        const account =
            await this.prisma.db.orm.public.LoyaltyAccount.first({
                id: transaction.loyaltyAccountId,
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

        return transaction;
    }
    async earn(
  businessId: number,
  accountId: number,
  pointsOperationDto: PointsOperationDto,
) {
  if (pointsOperationDto.points <= 0) {
    throw new BadRequestException(
      'Earn points must be greater than zero.',
    );
  }

  return this.create(
    businessId,
    {
      loyaltyAccountId: accountId,
      points: pointsOperationDto.points,
      type: LoyaltyTransactionType.EARN,
      description: pointsOperationDto.description,
    },
  );
}
async redeem(
  businessId: number,
  accountId: number,
  pointsOperationDto: PointsOperationDto,
) {
  if (pointsOperationDto.points <= 0) {
    throw new BadRequestException(
      'Redeem points must be greater than zero.',
    );
  }

  return this.create(
    businessId,
    {
      loyaltyAccountId: accountId,
      points: -pointsOperationDto.points,
      type: LoyaltyTransactionType.REDEEM,
      description: pointsOperationDto.description,
    },
  );
}
}