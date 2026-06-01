import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => api.get(`/recipes`).then((r) => r.data),
  });
};
