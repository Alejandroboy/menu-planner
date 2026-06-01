import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => api.delete(`recipes/${id}`).then((r) => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
