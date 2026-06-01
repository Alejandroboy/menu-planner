import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useMenuPlan = (menuPlanId: number) => {
  return useQuery({
    queryKey: ['menu-plans', menuPlanId],
    queryFn: () => api.get(`/menu-plans/${menuPlanId}`).then((r) => r.data),
  });
};
