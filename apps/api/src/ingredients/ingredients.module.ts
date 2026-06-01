import { Module } from '@nestjs/common';
import { IngredientsController } from '@/ingredients/ingredients.controller';
import { IngredientsService } from '@/ingredients/ingredients.service';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
