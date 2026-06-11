import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/client';
import { MenuPlan, MutationType } from '@/api/types';

export const useCreateOrUpdateMenuPlan = (type: MutationType, menuPlanId?: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, date: dateString }: { name: string; date: string }) => {
      const date = new Date(dateString);
      if (type === 'create') {
        return api.post('menu-plans', { name, date }).then((r) => r.data);
      }
      if (type === 'update') {
        return api.patch(`menu-plans/${menuPlanId}`, { name, date }).then((r) => r.data);
      }
    },

    onSuccess: (menuPlan: MenuPlan) => {
      queryClient.invalidateQueries({ queryKey: ['menu-plans'] });
      navigate({ to: '/menu-plans/$menuPlanId', params: { menuPlanId: String(menuPlan.id) } });
    },
  });
};
