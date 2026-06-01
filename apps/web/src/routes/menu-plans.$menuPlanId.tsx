import { createFileRoute, Link } from '@tanstack/react-router';
import { useMenuPlan } from '@/api/use-menu-plan.hook';
import { SmallRecipe } from '@/components/small-recipe';
import { MenuPlanItem } from '@/api/types';

export const Route = createFileRoute('/menu-plans/$menuPlanId')({
  component: MenuPlanPage,
});

function MenuPlanPage() {
  const { menuPlanId } = Route.useParams();

  const { data, isLoading, error } = useMenuPlan(Number(menuPlanId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const date = new Date(data.date);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div>Название: {data.name}</div>
        <Link
          to={'/menu-plans/$menuPlanId/update'}
          params={{ menuPlanId }}
          className="border rounded-md p-2"
        >
          Изменить
        </Link>
      </div>
      <div>
        Дата создания:&nbsp;
        {date.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div>Состав:</div>
      <ul>
        {data.items.map((menuPlan: MenuPlanItem) => (
          <li key={menuPlan.id} className="p-2 border rounded-md w-fit">
            <div>Тип: {menuPlan.mealType}</div>
            <div>Количество: {menuPlan.servings}</div>
            <SmallRecipe recipeId={menuPlan.recipeId} />
          </li>
        ))}
      </ul>
    </div>
  );
}
