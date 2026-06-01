import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useRecipe = (recipeId: number) => {
  return useQuery({
    queryKey: ['recipes', recipeId],
    queryFn: () => api.get(`/recipes/${recipeId}`).then((r) => r.data),
  });
};
