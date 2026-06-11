import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/client';
import { MealType, MenuPlanItem, MutationType } from '@/api/types';

export const useMenuPlanItem = (type: MutationType, menuPlanId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipeId,
      mealType,
      servings,
      menuPlanItemId,
    }: {
      recipeId?: number;
      mealType?: MealType;
      servings?: number;
      menuPlanItemId?: number;
    }) => {
      if (type === MutationType.ADD) {
        return api
          .post(`menu-plans/${menuPlanId}/item`, {
            recipeId,
            mealType,
            servings,
          })
          .then((r) => r.data);
      }
      if (type === MutationType.DELETE) {
        return api.delete(`menu-plans/${menuPlanId}/item/${menuPlanItemId}`).then((r) => r.data);
      }
    },
    onSuccess: async (MenuPlanItem: MenuPlanItem) => {
      console.log('MenuPlanItem', MenuPlanItem);
      queryClient.invalidateQueries({ queryKey: ['menu-plans'] });
      navigate({
        to: '/menu-plans/$menuPlanId',
        params: { menuPlanId: String(MenuPlanItem.menuPlanId) },
      });
    },
  });
};
