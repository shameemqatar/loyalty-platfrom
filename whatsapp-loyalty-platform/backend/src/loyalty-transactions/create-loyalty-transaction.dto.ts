export class CreateLoyaltyTransactionDto {
  loyaltyAccountId: number;
  points: number;
  type: string;
  description?: string;
}