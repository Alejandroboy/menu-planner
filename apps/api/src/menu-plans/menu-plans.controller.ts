import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MenuPlansService } from '@/menu-plans/menu-plans.service';
import { CreateMenuPlanDto } from '@/menu-plans/dto/create-menu-plan.dto';
import { UpdateMenuPlanDto } from '@/menu-plans/dto/update-menu-plan.dto';
import { AddMenuPlanItemDto } from '@/menu-plans/dto/add-menu-plan-item.dto';

@ApiTags('menu-plans')
@Controller('menu-plans')
export class MenuPlansController {
  constructor(private readonly menuPlansService: MenuPlansService) {}

  @Get()
  findAll() {
    return this.menuPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuPlansService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMenuPlanDto) {
    return this.menuPlansService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMenuPlanDto) {
    return this.menuPlansService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuPlansService.delete(id);
  }

  @Post(':id/item')
  addItem(@Param('id', ParseIntPipe) id: number, @Body() dto: AddMenuPlanItemDto) {
    return this.menuPlansService.addMenuItem(id, dto);
  }

  @Delete(':id/item/:itemId')
  deleteItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.menuPlansService.deleteMenuItem(itemId);
  }
}
