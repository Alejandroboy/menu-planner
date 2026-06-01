import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ShoppingService } from '@/shopping/shopping.service';

@ApiTags('shopping')
@Controller('shopping')
export class ShoppingController {
  constructor(private shoppingService: ShoppingService) {}

  @Get(':id')
  getShoppingList(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingService.getShoppingList(id);
  }
}
