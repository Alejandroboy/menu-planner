import { createFileRoute, Link } from '@tanstack/react-router';
import { useMenuPlan } from '@/api/use-menu-plan.hook';
import { SmallRecipe } from '@/components/small-recipe';
import { MenuPlanItem, MutationType } from '@/api/types';
import { useMenuPlanItem } from '@/api/use-menu-plan-item.hook';
import { ShoppingList } from '@/components/shopping-list';

export const Route = createFileRoute('/menu-plans/$menuPlanId')({
  component: MenuPlanPage,
});

function MenuPlanPage() {
  const { menuPlanId } = Route.useParams();
  const { data, isLoading, error } = useMenuPlan(Number(menuPlanId));
  const mutation = useMenuPlanItem(MutationType.DELETE, Number(menuPlanId));

  function handleDelete(id: number) {
    mutation.mutate({ menuPlanItemId: id });
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const date = new Date(data.date);

  function renderRecipes() {
    if (data.items.length) {
      return (
        <div>
          <ul className="flex flex-wrap gap-2">
            {data.items.map((menuPlanItem: MenuPlanItem) => (
              <li key={menuPlanItem.id} className="p-2 border rounded-md w-fit relative pr-[35px]">
                <div>Тип: {menuPlanItem.mealType}</div>
                <div>Количество: {menuPlanItem.servings}</div>
                <SmallRecipe recipeId={menuPlanItem.recipeId} />
                <div
                  className="absolute top-[10px] right-[10px] cursor-pointer"
                  onClick={() => handleDelete(menuPlanItem.id)}
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to={'/menu-plans/$menuPlanId/item'}
            params={{ menuPlanId }}
            className="mt-[15px] p-2 border rounded-md w-fit block"
          >
            Добавить
          </Link>
        </div>
      );
    }
    return (
      <div>
        <div>Нет рецептов</div>
        <Link
          to={'/menu-plans/$menuPlanId/item'}
          params={{ menuPlanId }}
          className="mt-[15px] p-2 border rounded-md w-fit block"
        >
          Добавить
        </Link>
      </div>
    );
  }

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
      {renderRecipes()}
      <div>
        <ShoppingList menuPlanId={Number(menuPlanId)} />
      </div>
    </div>
  );
}
