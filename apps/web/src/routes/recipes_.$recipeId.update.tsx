import { createFileRoute } from '@tanstack/react-router';
import { MutationType } from '@/api/types';
import { FormRecipe } from '@/components/form-recipe';
import { useRecipe } from '@/api/use-recipe.hook';

export const Route = createFileRoute('/recipes_/$recipeId/update')({
  component: RecipesUpdatePage,
});

function RecipesUpdatePage() {
  const { recipeId } = Route.useParams();

  const { data, isLoading, error } = useRecipe(Number(recipeId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <FormRecipe
      type={MutationType.UPDATE}
      recipeId={Number(recipeId)}
      name={data.name}
      description={data.description}
      defaultServings={data.defaultServings}
      portionWeightG={data.portionWeightG}
    />
  );
}
