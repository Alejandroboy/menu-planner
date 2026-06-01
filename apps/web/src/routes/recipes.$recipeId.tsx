import { createFileRoute, Link } from '@tanstack/react-router';
import { useRecipe } from '@/api/use-recipe.hook';
import { SmallIngredient } from '@/components/small-ingredient';
import { Ingredient, RecipeIngredient } from '@/api/types';

export const Route = createFileRoute('/recipes/$recipeId')({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const { data, isLoading, error } = useRecipe(Number(recipeId));
  console.log('RecipePage data', data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log('RecipePage data', data);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div>Название: {data?.name}</div>
        <div>
          <Link
            to={'/recipes/$recipeId/update'}
            params={{ recipeId }}
            className="border rounded-md p-2"
          >
            Изменить
          </Link>
        </div>
      </div>
      <div>Название: {data.name}</div>
      <div>Описание: {data.description}</div>
      <div>Порция: {data.portionWeightG} гр</div>
      <div>
        Ингредиенты
        <ul className="flex flex-wrap gap-2">
          {data.ingredients.map((ingredient: RecipeIngredient) => (
            <li key={ingredient.id}>
              <SmallIngredient id={ingredient.ingredientId} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
