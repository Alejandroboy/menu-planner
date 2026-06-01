import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/client';
import { MenuPlan } from '@/api/types';

export const useCreateMenuPlan = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, date: dateString }: { name: string; date: string }) => {
      console.log('...........', name, dateString);
      const date = new Date(dateString);
      return api.post('menu-plans', { name, date }).then((r) => r.data);
    },

    onSuccess: (menuPlan: MenuPlan) => {
      queryClient.invalidateQueries({ queryKey: ['menu-plans'] });
      navigate({ to: '/menu-plans/$menuPlanId', params: { menuPlanId: String(menuPlan.id) } });
    },
  });
};
