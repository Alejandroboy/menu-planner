import { PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from '@/ingredients/dto/create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
