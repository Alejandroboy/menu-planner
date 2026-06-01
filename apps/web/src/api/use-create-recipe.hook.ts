import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { useNavigate } from '@tanstack/react-router';
import { Ingredient, Recipe } from '@/api/types';

export const useCreateRecipe = () => {
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
    }) =>
      api
        .post(`/recipes/`, { description, name, defaultServings, portionWeightG })
        .then((r) => r.data),

    onSuccess: (recipe: Recipe) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate({ to: '/recipes/$recipeId', params: { recipeId: String(recipe.id) } });
    },
  });
};
