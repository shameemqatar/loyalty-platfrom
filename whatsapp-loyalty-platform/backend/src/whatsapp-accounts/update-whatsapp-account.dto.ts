import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateWhatsAppAccountDto {
  @IsOptional()
  @IsString()
  phoneNumberId?: string;

  @IsOptional()
  @IsString()
  wabaId?: string;

  @IsOptional()
  @IsString()
  displayPhoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}