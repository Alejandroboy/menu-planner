import { createFileRoute } from '@tanstack/react-router';
import { useRecipes } from '@/api/use-recipes.hook';
import { useMenuPlanItem } from '@/api/use-menu-plan-item.hook';
import { MealType, MutationType } from '@/api/types';
import { useState } from 'react';

export const Route = createFileRoute('/menu-plans_/$menuPlanId/item')({
  component: MenuPlanItemPage,
});

function MenuPlanItemPage() {
  const { menuPlanId } = Route.useParams();
  const { data, isLoading, error } = useRecipes();
  const mutation = useMenuPlanItem(MutationType.ADD, Number(menuPlanId));
  const [form, setForm] = useState({
    recipeId: 0,
    mealType: MealType.BREAKFAST,
    servings: 0,
  });

  function handleSubmit() {
    mutation.mutate({
      recipeId: form.recipeId,
      mealType: form.mealType,
      servings: form.servings,
    });
  }

  if (isLoading) return <span>Loading .....</span>;

  if (error) return <span>{error.message}</span>;

  return (
    <div className="p-4">
      <label className="block">
        <span className="text-sm font-medium">Рецепт</span>
        <select
          value={form.recipeId}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, recipeId: Number(e.target.value) })}
        >
          {data.map(({ name, id }: { name: string; id: number }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Тип питания</span>
        <select
          value={form.mealType}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, mealType: e.target.value as MealType })}
        >
          <option value={MealType.BREAKFAST}>Завтрак</option>
          <option value={MealType.LUNCH}>Обед</option>
          <option value={MealType.DINNER}>Ужин</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Количество порций</span>
        <input
          type="number"
          value={form.servings}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, servings: Number(e.target.value) })}
        />
      </label>
      <button onClick={handleSubmit} className="rounded-md border bg-gray-50 p-3 mt-[20px]">
        Добавить
      </button>
    </div>
  );
}
