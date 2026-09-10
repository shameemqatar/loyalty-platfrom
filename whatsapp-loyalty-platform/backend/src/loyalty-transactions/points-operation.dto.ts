import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PointsOperationDto {
  @IsInt()
  @IsNotEmpty()
  points: number;

  @IsOptional()
  @IsString()
  description?: string;
}