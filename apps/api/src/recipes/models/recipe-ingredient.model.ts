import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class RecipeIngredient {
  @IsInt()
  id: number;

  @IsInt()
  recipeId: number;

  @IsInt()
  ingredientId: number;

  @IsInt()
  @IsOptional()
  grossWeightG?: number;

  @IsBoolean()
  @IsOptional()
  applyColdProcessing?: boolean;

  @IsInt()
  processingTypeId: number;
}
