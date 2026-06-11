import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ShoppingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getShoppingList(menuPlanId: number) {
    const plan = await this.prismaService.menuPlan.findUnique({
      where: {
        id: menuPlanId,
      },
      include: {
        items: {
          include: {
            recipe: {
              include: {
                ingredients: {
                  include: { ingredient: { include: { unit: true } } },
                },
              },
            },
          },
        },
      },
    });
    if (!plan) {
      throw new NotFoundException(`No plan found with id ${menuPlanId}`);
    }
    const totals = new Map<number, { name: string; grams: number; unit: string }>();

    for (const item of plan.items) {
      for (const ingredient of item.recipe.ingredients) {
        let grams = ingredient.grossWeightG * item.servings;

        if (ingredient.applyColdProcessing) {
          grams *= ingredient.ingredient.lossCold;
        }

        switch (ingredient.processingTypeId) {
          case 2:
            grams *= ingredient.ingredient.lossBoil;
            break;
          case 3:
            grams *= ingredient.ingredient.lossFry;
            break;
          case 4:
            grams *= ingredient.ingredient.lossBake;
        }

        const existing = totals.get(ingredient.ingredientId);
        if (existing) {
          existing.grams += grams;
        } else {
          totals.set(ingredient.ingredientId, {
            name: ingredient.ingredient.name,
            grams: Math.round(grams),
            unit: ingredient.ingredient.unit.name,
          });
        }
      }
    }

    return Array.from(totals.values());
  }
}
