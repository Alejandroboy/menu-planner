import { PartialType } from '@nestjs/swagger';
import { CreateMenuPlanDto } from '@/menu-plans/dto/create-menu-plan.dto';

export class UpdateMenuPlanDto extends PartialType(CreateMenuPlanDto) {}
