import { IsString, IsInt } from 'class-validator';
import { MealType } from '@prisma/client';

export class AddMenuPlanItemDto {
  @IsInt()
  menuPlanId: number;

  @IsInt()
  recipeId: number;

  @IsString()
  mealType: MealType;

  @IsInt()
  servings: number;
}
