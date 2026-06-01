import { createFileRoute, Link } from '@tanstack/react-router';
import { useRecipes } from '@/api/use-recipes.hook';
import { useDeleteRecipe } from '@/api/use-delete-recipe.hook';

export const Route = createFileRoute('/recipes/')({
  component: RecipesComponent,
});

function RecipesComponent() {
  const { data, isLoading, error } = useRecipes();
  const mutation = useDeleteRecipe();

  function handleDelete(id: number) {
    mutation.mutate({ id });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex p-2">
      <ul>
        {data.map((recipe: { id: number; name: string }) => {
          return (
            <li key={recipe.id} className="p-2 mb-[10px] w-fit relative">
              <Link
                to={`/recipes/$recipeId`}
                params={{ recipeId: String(recipe.id) }}
                className="border p-2 rounded-md pr-[40px]"
              >
                <span>{recipe.name}</span>
              </Link>

              <div
                className="absolute top-[10px] right-[-20px] cursor-pointer"
                onClick={() => handleDelete(recipe.id)}
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
          );
        })}
      </ul>
      <div>
        <div className="mt-[15px]">
          <Link to={`/recipes/new`} className="border block rounded-md mb-[10px] p-2">
            Создать новый рецепт
          </Link>
        </div>
      </div>
    </div>
  );
}
