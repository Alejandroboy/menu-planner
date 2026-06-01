import { useQuery } from '@tanstack/react-query';
import { api } from './client';

export function useMenuPlans() {
  return useQuery({
    queryKey: ['menu-plans'],
    queryFn: () => api.get(`/menu-plans`).then((r) => r.data),
  });
}
