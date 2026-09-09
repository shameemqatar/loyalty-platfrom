import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLoyaltyTransactionDto } from './create-loyalty-transaction.dto.js';

@Injectable()
export class LoyaltyTransactionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    businessId: number,
    createLoyaltyTransactionDto: CreateLoyaltyTransactionDto,
  ) {
    const account =
      await this.prisma.db.orm.public.LoyaltyAccount.first({
        id: createLoyaltyTransactionDto.loyaltyAccountId,
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

    const { points, type } =
      createLoyaltyTransactionDto;

    if (points === 0) {
      throw new BadRequestException(
        'Transaction points cannot be zero.',
      );
    }

    if (!['EARN', 'REDEEM', 'ADJUSTMENT'].includes(type)) {
      throw new BadRequestException(
        'Invalid transaction type.',
      );
    }

    if (type === 'EARN' && points < 0) {
      throw new BadRequestException(
        'EARN transactions must have positive points.',
      );
    }

    if (type === 'REDEEM' && points > 0) {
      throw new BadRequestException(
        'REDEEM transactions must have negative points.',
      );
    }

    const newBalance = account.points + points;

    if (newBalance < 0) {
      throw new BadRequestException(
        'Insufficient loyalty points.',
      );
    }

    const transaction =
      await this.prisma.db.orm.public.LoyaltyTransaction.create({
        points,
        type,
        description:
          createLoyaltyTransactionDto.description ?? null,
        loyaltyAccountId:
          createLoyaltyTransactionDto.loyaltyAccountId,
      });

    await this.prisma.db.orm.public.LoyaltyAccount
      .where({
        id: account.id,
      })
      .update({
        points: newBalance,
      });

    return transaction;
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
}