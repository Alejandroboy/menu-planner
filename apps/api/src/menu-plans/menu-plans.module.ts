import { Module } from '@nestjs/common';
import { MenuPlansController } from '@/menu-plans/menu-plans.controller';
import { MenuPlansService } from '@/menu-plans/menu-plans.service';

@Module({
  controllers: [MenuPlansController],
  providers: [MenuPlansService],
})
export class MenuPlansModule {}
