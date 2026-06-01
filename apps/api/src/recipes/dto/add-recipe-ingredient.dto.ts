import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class AddRecipeIngredientDto {
  @IsInt()
  ingredientId: number;

  @IsInt()
  @Min(0)
  grossWeightG: number;

  @IsBoolean()
  @IsOptional()
  applyColdProcessing?: boolean;

  @IsInt()
  processingTypeId: number;
}
