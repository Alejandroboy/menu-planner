import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '@/api/client';
import { Ingredient } from '@/api/types';

export const useCreateOrUpdateIngredient = (type: string, ingredientId?: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      unitId,
      gramsPerUnit,
      lossCold,
      lossFry,
      lossBoil,
      lossBake,
    }: {
      name: string;
      unitId: number;
      gramsPerUnit: number;
      lossCold: number;
      lossFry: number;
      lossBoil: number;
      lossBake: number;
    }) => {
      if (type === 'create') {
        return api
          .post('ingredients', {
            name,
            unitId,
            gramsPerUnit,
            lossCold,
            lossFry,
            lossBoil,
            lossBake,
          })
          .then((r) => r.data);
      }
      if (type === 'update') {
        return api
          .patch(`/ingredients/${ingredientId}`, {
            name,
            unitId,
            gramsPerUnit,
            lossCold,
            lossFry,
            lossBoil,
            lossBake,
          })
          .then((r) => r.data);
      }
    },

    onSuccess: (ingredient: Ingredient) => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      navigate({
        to: '/ingredients/$ingredientId',
        params: { ingredientId: String(ingredient.id) },
      });
    },
  });
};
