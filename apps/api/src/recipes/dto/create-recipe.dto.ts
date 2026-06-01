import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsOptional()
  portionWeightG?: number;

  @IsNumber()
  defaultServings: number;

  @IsString()
  @IsOptional()
  description?: string;
}
