import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useDeleteMenuPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) =>
      api.delete(`menu-plans/${id}`).then((r) => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-plans'] });
    },
  });
};
