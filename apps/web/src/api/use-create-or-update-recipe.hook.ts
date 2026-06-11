import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { MutationType, Recipe } from '@/api/types';
import { api } from '@/api/client';

export const useCreateOrUpdateRecipe = (type: MutationType, recipeId?: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      portionWeightG,
      defaultServings,
    }: {
      name: string;
      portionWeightG: number;
      defaultServings: number;
      description: string | null;
    }) => {
      if (type === MutationType.CREATE) {
        return api
          .post(`/recipes/`, { description, name, defaultServings, portionWeightG })
          .then((r) => r.data);
      }
      if (type === MutationType.UPDATE) {
        return api
          .patch(`/recipes/${recipeId}`, { description, name, defaultServings, portionWeightG })
          .then((r) => r.data);
      }
    },

    onSuccess: (recipe: Recipe) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate({ to: '/recipes/$recipeId', params: { recipeId: String(recipe.id) } });
    },
  });
};
