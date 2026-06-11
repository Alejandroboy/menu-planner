export interface MenuPlan {
  id: number;
  name: string;
  date: string;
  items: MenuPlanItem[];
}

export interface MenuPlanItem {
  id: number;
  menuPlanId: number;
  recipeId: number;
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | null;
  servings: number;
}

export interface Recipe {
  defaultServings: number;
  description: string | null;
  id: number;
  ingredients: RecipeIngredient[] | [];
  name: string;
  portionWeightG: number;
}

export interface RecipeIngredient {
  applyColdProcessing: boolean;
  grossWeightG: number;
  id: number;
  ingredientId: number;
  processingTypeId: number;
  recipeId: number;
}
export interface Ingredient {
  id: number;
  name?: string;
  unitId?: number;
  gramsPerUnit?: number;
  lossCold?: number;
  lossFry?: number;
  lossBoil?: number;
  lossBake?: number;
  unit: {
    id: number;
    name: string;
    gramsPerUnit: number;
  };
}

export interface ShoppingItem {
  grams: number;
  name: string;
  unit: string;
}

export enum MutationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ADD = 'add',
}

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}
