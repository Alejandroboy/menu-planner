import { createFileRoute } from '@tanstack/react-router';
import { FormMenuPlan } from '@/components/form-menu-plan';
import { MutationType } from '@/api/types';

export const Route = createFileRoute('/menu-plans/new')({
  component: MenuPlansNewPage,
});

function MenuPlansNewPage() {
  return <FormMenuPlan type={MutationType.CREATE} />;
}
