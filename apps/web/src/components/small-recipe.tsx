import { useRecipe } from '@/api/use-recipe.hook';

export const SmallRecipe = ({ recipeId }: { recipeId: number }) => {
  const { data, isLoading, error } = useRecipe(recipeId);

  if (isLoading) {
    return 'Loading...';
  }
  if (error) {
    return `Error: ${error.message}`;
  }

  return <div>{data.name}</div>;
};
