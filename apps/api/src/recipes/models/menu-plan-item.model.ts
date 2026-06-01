import { IsEnum, IsInt, IsString } from 'class-validator';
import { MealType } from '@prisma/client';

export class MenuPlanItem {
  @IsInt()
  id: number;

  @IsInt()
  menuPlanId: number;

  @IsInt()
  recipeId: number;

  @IsString()
  mealType: MealType;

  @IsInt()
  servings: number;
}
