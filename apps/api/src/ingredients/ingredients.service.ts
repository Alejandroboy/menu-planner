import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateIngredientDto } from '@/ingredients/dto/create-ingredient.dto';
import { UpdateIngredientDto } from '@/ingredients/dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.ingredient.findMany({
      include: { unit: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const ingredient = await this.prismaService.ingredient.findUnique({
      where: { id },
      include: { unit: true },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient ${id} not found`);
    }
    return ingredient;
  }

  create(dto: CreateIngredientDto) {
    return this.prismaService.ingredient.create({ data: dto });
  }

  async update(id: number, dto: UpdateIngredientDto) {
    await this.findOne(id);
    return this.prismaService.ingredient.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prismaService.ingredient.delete({
      where: { id },
    });
  }
}
