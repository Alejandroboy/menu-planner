import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateMenuPlanDto } from '@/menu-plans/dto/create-menu-plan.dto';
import { UpdateMenuPlanDto } from '@/menu-plans/dto/update-menu-plan.dto';
import { AddMenuPlanItemDto } from '@/menu-plans/dto/add-menu-plan-item.dto';

@Injectable()
export class MenuPlansService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.menuPlan.findMany({
      include: { items: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const menuPlan = await this.prismaService.menuPlan.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!menuPlan) {
      throw new NotFoundException(`Menu plan with id ${id} not found`);
    }

    return menuPlan;
  }

  create(dto: CreateMenuPlanDto) {
    return this.prismaService.menuPlan.create({
      data: dto,
    });
  }

  async update(id: number, dto: UpdateMenuPlanDto) {
    await this.findOne(id);
    return this.prismaService.menuPlan.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prismaService.menuPlan.delete({
      where: { id },
    });
  }

  async addMenuItem(menuPlanId: number, dto: AddMenuPlanItemDto) {
    await this.findOne(menuPlanId);
    return this.prismaService.menuPlanItem.create({
      data: { ...dto, menuPlanId },
    });
  }

  async deleteMenuItem(id: number) {
    return this.prismaService.menuPlanItem.delete({ where: { id } });
  }
}
