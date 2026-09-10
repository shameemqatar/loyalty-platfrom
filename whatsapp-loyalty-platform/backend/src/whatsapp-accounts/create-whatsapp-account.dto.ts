import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWhatsAppAccountDto {
  @IsString()
  @IsNotEmpty()
  phoneNumberId: string;

  @IsString()
  @IsNotEmpty()
  wabaId: string;

  @IsOptional()
  @IsString()
  displayPhoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
