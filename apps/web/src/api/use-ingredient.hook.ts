import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useIngredient = (ingredientId: number) => {
  return useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: () => api.get(`/ingredients/${ingredientId}`).then((r) => r.data),
  });
};
