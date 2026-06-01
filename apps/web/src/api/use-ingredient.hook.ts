import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Ingredient } from '@/api/types';

export const useIngredient = (ingredientId: number): UseQueryResult<Ingredient> => {
  return useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: () => api.get(`/ingredients/${ingredientId}`).then((r) => r.data),
  });
};
