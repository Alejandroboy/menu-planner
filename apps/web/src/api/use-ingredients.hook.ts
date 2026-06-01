import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: () => api.get(`/ingredients`).then((r) => r.data),
  });
};
