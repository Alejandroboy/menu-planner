import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) =>
      api.delete(`ingredients/${id}`).then((r) => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};
