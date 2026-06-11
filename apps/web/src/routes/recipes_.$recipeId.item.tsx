import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { MutationType } from '@/api/types';
import { useRecipeIngredient } from '@/api/use-recipe-ingredient.hook';
import { useIngredients } from '@/api/use-ingredients.hook';

export const Route = createFileRoute('/recipes_/$recipeId/item')({
  component: RecipeItemPage,
});

function RecipeItemPage() {
  const { recipeId } = Route.useParams();
  const { data, isLoading, error } = useIngredients();
  const mutation = useRecipeIngredient(MutationType.ADD, Number(recipeId));
  const [form, setForm] = useState({
    grossWeightG: 0,
    applyColdProcessing: false,
    processingTypeId: 0,
    ingredientId: 0,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  function handleSubmit() {
    mutation.mutate({
      grossWeightG: form.grossWeightG,
      applyColdProcessing: form.applyColdProcessing,
      processingTypeId: form.processingTypeId,
      ingredientId: form.ingredientId,
    });
  }

  return (
    <div className="p-4">
      <label className="block">
        <span className="text-sm font-medium">Ингредиент</span>
        <select
          value={form.ingredientId}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, ingredientId: Number(e.target.value) })}
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
        <span className="text-sm font-medium">Применить холодную обработку</span>
        <select
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, applyColdProcessing: Boolean(e.target.value) })}
        >
          <option value={0}>Нет</option>
          <option value={1}>Да</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Тип обработки</span>
        <select
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, processingTypeId: Number(e.target.value) })}
        >
          <option value={1}>Варка</option>
          <option value={2}>Жарка</option>
          <option value={3}>Запекание</option>
          <option value={4}>Нет обработки</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Масса брутто (г)</span>
        <input
          type="number"
          value={form.grossWeightG}
          onChange={(e) => setForm({ ...form, grossWeightG: Number(e.target.value) })}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
        />
      </label>
      <button onClick={handleSubmit} className="rounded-md border bg-gray-50 p-3 mt-[20px]">
        Добавить
      </button>
    </div>
  );
}
