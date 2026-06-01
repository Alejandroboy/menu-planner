import { useIngredient } from '@/api/use-ingredient.hook';

export const SmallIngredient = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useIngredient(id);

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return <div className="p-2 border rounded-md w-fit">{data.name}</div>;
};
