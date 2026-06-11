import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RecipesService } from '@/recipes/recipes.service';
import { CreateRecipeDto } from '@/recipes/dto/create-recipe.dto';
import { UpdateRecipeDto } from '@/recipes/dto/update-recipe.dto';
import { AddRecipeIngredientDto } from '@/recipes/dto/add-recipe-ingredient.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.delete(id);
  }

  @Post(':id/ingredients')
  addIngredient(@Param('id', ParseIntPipe) id: number, @Body() dto: AddRecipeIngredientDto) {
    return this.recipesService.addIngredient(id, dto);
  }

  @Delete(':id/ingredients/:ingredientId')
  deleteIngredient(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.recipesService.deleteIngredient(ingredientId);
  }
}
