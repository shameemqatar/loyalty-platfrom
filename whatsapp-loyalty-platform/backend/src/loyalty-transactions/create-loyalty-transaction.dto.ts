import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { LoyaltyTransactionType } from './loyalty-transaction-type.enum.js';

export class CreateLoyaltyTransactionDto {
  @IsInt()
  @IsNotEmpty()
  loyaltyAccountId: number;

  @IsInt()
  @IsNotEmpty()
  points: number;

  @IsEnum(LoyaltyTransactionType)
  type: LoyaltyTransactionType;

  @IsOptional()
  @IsString()
  description?: string;
}