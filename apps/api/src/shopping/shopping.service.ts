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
    console.log('>>>>>>>>>>> plan <<<<<<<<<<<', plan);
    console.log('>>>>>>>>>>> plan.items <<<<<<<<<<<', plan.items);
    console.log('>>>>>>>>>>> plan.items[0].recipe <<<<<<<<<<<', plan.items[0].recipe);
    const totals = new Map<number, { name: string; grams: number; unit: string }>();

    for (const item of plan.items) {
      for (const ingridient of item.recipe.ingredients) {
        let grams = ingridient.grossWeightG * item.servings;

        if (ingridient.applyColdProcessing) {
          grams *= ingridient.ingredient.lossCold;
        }

        switch (ingridient.processingTypeId) {
          case 2:
            grams *= ingridient.ingredient.lossBoil;
            break;
          case 3:
            grams *= ingridient.ingredient.lossFry;
            break;
          case 4:
            grams *= ingridient.ingredient.lossBake;
        }

        const existing = totals.get(ingridient.ingredientId);
        if (existing) {
          existing.grams += grams;
        } else {
          totals.set(ingridient.ingredientId, {
            name: ingridient.ingredient.name,
            grams: Math.round(grams),
            unit: ingridient.ingredient.unit.name,
          });
        }
      }
    }

    return Array.from(totals.values());
  }
}
