import { Module } from '@nestjs/common';
import { ShoppingController } from '@/shopping/shopping.controller';
import { ShoppingService } from '@/shopping/shopping.service';

@Module({
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class ShoppingModule {}
