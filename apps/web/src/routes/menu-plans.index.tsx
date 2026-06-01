import { createFileRoute, Link } from '@tanstack/react-router';
import { useMenuPlans } from '@/api/use-menu-plans.hook';
import { useDeleteMenuPlan } from '@/api/use-delete-menu-plan.hook';

export const Route = createFileRoute('/menu-plans/')({
  component: MenuPlansPage,
});

function MenuPlansPage() {
  const { data, isLoading, error } = useMenuPlans();
  const mutation = useDeleteMenuPlan();

  if (isLoading) {
    return <div>Загрузка....</div>;
  }

  if (error) {
    return <div>Ошибка</div>;
  }

  function handleDelete(id: number) {
    mutation.mutate({ id });
  }
  return (
    <div className="p-2 flex">
      <ul>
        {data.map((plan: { id: number; name: string }) => (
          <li key={plan.id} className="p-2 mb-[10px] w-fit relative">
            <Link
              to={`/menu-plans/$menuPlanId`}
              params={{ menuPlanId: String(plan.id) }}
              className="border p-2 rounded-md"
            >
              {plan.name}
            </Link>
            <div
              className="absolute top-[10px] right-[-20px] cursor-pointer"
              onClick={() => handleDelete(plan.id)}
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
      <div>
        <Link to="/menu-plans/new" className="border block rounded-md mb-[10px] p-2">
          Создать новый план
        </Link>
      </div>
    </div>
  );
}
