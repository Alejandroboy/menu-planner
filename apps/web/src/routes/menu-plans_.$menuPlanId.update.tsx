import { createFileRoute } from '@tanstack/react-router';
import { useMenuPlan } from '@/api/use-menu-plan.hook';
import { FormMenuPlan } from '@/components/form-menu-plan';
import { MutationType } from '@/api/types';

export const Route = createFileRoute('/menu-plans_/$menuPlanId/update')({
  component: MenuPlanUpdatePage,
});

function MenuPlanUpdatePage() {
  const { menuPlanId } = Route.useParams();

  const { data, isLoading, error } = useMenuPlan(Number(menuPlanId));
  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
  }
  return (
    <FormMenuPlan
      type={MutationType.UPDATE}
      name={data.name}
      date={data.date}
      menuPlanId={Number(menuPlanId)}
    />
  );
}
