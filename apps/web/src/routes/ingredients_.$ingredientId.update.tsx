import { createFileRoute } from '@tanstack/react-router';
import { useIngredient } from '@/api/use-ingredient.hook';
import { FormIngredient } from '@/components/form-ingredient';

export const Route = createFileRoute('/ingredients_/$ingredientId/update')({
  component: IngredientUpdatePage,
});

function IngredientUpdatePage() {
  const { ingredientId } = Route.useParams();
  const { data, isLoading, error } = useIngredient(Number(ingredientId));
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <FormIngredient
      type="update"
      ingredientId={Number(ingredientId)}
      name={data?.name}
      lossFry={data?.lossFry}
      lossCold={data?.lossCold}
      lossBake={data?.lossBake}
      lossBoil={data?.lossBoil}
      unitId={data?.unitId}
      gramsPerUnit={data?.gramsPerUnit}
    />
  );
}
