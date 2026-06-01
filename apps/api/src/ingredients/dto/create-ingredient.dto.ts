import { IsString, IsInt, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  unitId: number;

  @IsNumber()
  @Min(0)
  gramsPerUnit: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  lossCold: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  lossFry: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  lossBoil: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  lossBake: number;
}
