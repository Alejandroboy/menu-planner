import { createFileRoute } from '@tanstack/react-router';
import { FormIngredient } from '@/components/form-ingredient';

export const Route = createFileRoute('/ingredients/new')({
  component: IngredientsNewPage,
});

function IngredientsNewPage() {
  return <FormIngredient type="create" />;
}
