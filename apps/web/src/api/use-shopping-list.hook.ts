import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useShoppingList = (id: number) => {
  return useQuery({
    queryKey: ['shopping'],
    queryFn: async () => api.get(`/shopping/${id}`).then((r) => r.data),
  });
};
