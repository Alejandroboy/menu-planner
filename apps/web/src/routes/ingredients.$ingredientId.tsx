import { createFileRoute, Link } from '@tanstack/react-router';
import { useIngredient } from '@/api/use-ingredient.hook';

export const Route = createFileRoute('/ingredients/$ingredientId')({
  component: IngredientPage,
});

function IngredientPage() {
  const { ingredientId } = Route.useParams();

  const { data, isLoading, error } = useIngredient(Number(ingredientId));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div>Название: {data?.name}</div>
        <div>
          <Link
            to={'/ingredients/$ingredientId/update'}
            params={{ ingredientId: ingredientId }}
            className="border rounded-md p-2"
          >
            Изменить
          </Link>
        </div>
      </div>
      <div>Грамм на юнит: {data?.gramsPerUnit}</div>
      <div>Потери при выпекании: {data?.lossBake}</div>
      <div>Потери при кипячении: {data?.lossBoil}</div>
      <div>Потери при заморозке: {data?.lossCold}</div>
      <div>Потери при жарке: {data?.lossFry}</div>
      <div>Юнит: {data?.unit.name}</div>
    </div>
  );
}
