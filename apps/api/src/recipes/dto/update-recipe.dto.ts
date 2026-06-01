import { PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from '@/recipes/dto/create-recipe.dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
