import { useIngredient } from '@/api/use-ingredient.hook';
import { RecipeIngredient } from '@/api/types';
import { processingTypeHelper } from '@/api/processing-type-helper';

export const SmallIngredient = ({
  ingredientId,
  applyColdProcessing,
  grossWeightG,
  processingTypeId,
}: RecipeIngredient) => {
  const { data, isLoading, error } = useIngredient(ingredientId);

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div className="p-2 border rounded-md w-fit">
      <div>{data.name}</div>
      <div>Холодная обработка - {applyColdProcessing ? 'Да' : 'Нет'}</div>
      <div>Способ обработки - {processingTypeHelper(processingTypeId)}</div>
      <div>Вес брутто - {grossWeightG} гр.</div>
    </div>
  );
};
