import { createFileRoute, Link } from '@tanstack/react-router';
import { useIngredients } from '@/api/use-ingredients.hook';
import { useDeleteIngredient } from '@/api/use-delete-ingredient.hook';

export const Route = createFileRoute('/ingredients/')({
  component: IngredientsPage,
});

function IngredientsPage() {
  const { data, isLoading, error } = useIngredients();
  const mutation = useDeleteIngredient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function handleDelete(id: number) {
    mutation.mutate({ id });
  }

  return (
    <div className="p-2 flex">
      <ul>
        {data.map((ingredient: { id: number; name: string }) => (
          <li key={ingredient.id} className="p-2 mb-[10px] w-fit relative">
            <Link
              to={'/ingredients/$ingredientId'}
              params={{ ingredientId: String(ingredient.id) }}
              className="border p-2 rounded-md"
            >
              {ingredient.name}
            </Link>
            <div
              className="absolute top-[10px] right-[-20px] cursor-pointer"
              onClick={() => handleDelete(ingredient.id)}
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
        <Link to={'/ingredients/new'} className="border block rounded-md mb-[10px] p-2">
          Создать новый ингредиент
        </Link>
      </div>
    </div>
  );
}
