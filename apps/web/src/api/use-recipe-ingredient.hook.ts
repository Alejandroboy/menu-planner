import { MutationType, RecipeIngredient } from '@/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { useNavigate } from '@tanstack/react-router';

export const useRecipeIngredient = (type: MutationType, recipeId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      grossWeightG,
      applyColdProcessing,
      processingTypeId,
      ingredientId,
    }: {
      grossWeightG?: number;
      applyColdProcessing?: boolean;
      processingTypeId?: number;
      ingredientId?: number;
    }) => {
      if (type === MutationType.ADD) {
        return api
          .post(`recipes/${recipeId}/ingredients`, {
            grossWeightG,
            applyColdProcessing,
            processingTypeId,
            ingredientId,
          })
          .then((r) => r.data);
      }
      if (type === MutationType.DELETE) {
        return api.delete(`recipes/${recipeId}/ingredients/${ingredientId}`).then((r) => r.data);
      }
    },

    onSuccess: async (recipeIngredient: RecipeIngredient) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate({
        to: '/recipes/$recipeId',
        params: { recipeId: String(recipeIngredient.recipeId) },
      });
    },
  });
};
