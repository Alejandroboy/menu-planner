import { PrismaService } from '@/prisma/prisma.service';
import { CreateRecipeDto } from '@/recipes/dto/create-recipe.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRecipeDto } from '@/recipes/dto/update-recipe.dto';
import { AddRecipeIngredientDto } from '@/recipes/dto/add-recipe-ingredient.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.recipe.findMany({
      include: { ingredients: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const recipe = await this.prismaService.recipe.findUnique({
      where: { id },
      include: { ingredients: true },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  create(dto: CreateRecipeDto) {
    return this.prismaService.recipe.create({ data: dto });
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.findOne(id);
    return this.prismaService.recipe.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prismaService.recipe.delete({ where: { id } });
  }

  async addIngredients(recipeId: number, dtos: AddRecipeIngredientDto[]) {
    return this.prismaService.$transaction([
      this.prismaService.recipeIngredient.deleteMany({ where: { recipeId } }),
      this.prismaService.recipeIngredient.createMany({
        data: dtos.map((dto) => ({ ...dto, recipeId })),
      }),
    ]);
  }
}
