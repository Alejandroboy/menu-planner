import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/recipes/update')({
  component: RecipesUpdatePage,
});

function RecipesUpdatePage() {
  return <div>Hello "/recipes/update"!</div>;
}
