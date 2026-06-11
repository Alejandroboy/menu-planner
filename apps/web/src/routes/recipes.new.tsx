import { createFileRoute } from '@tanstack/react-router';
import { FormRecipe } from '@/components/form-recipe';
import { MutationType } from '@/api/types';

export const Route = createFileRoute('/recipes/new')({
  component: RecipesNewPage,
});

function RecipesNewPage() {
  return <FormRecipe type={MutationType.CREATE} />;
}
