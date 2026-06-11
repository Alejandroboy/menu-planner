import { MutationType } from '@/api/types';
import { useCreateOrUpdateRecipe } from '@/api/use-create-or-update-recipe.hook';
import { useState } from 'react';

export const FormRecipe = ({
  type,
  recipeId,
  name = '',
  portionWeightG = 0,
  defaultServings = 0,
  description = '',
}: {
  type: MutationType;
  recipeId?: number;
  name?: string;
  portionWeightG?: number;
  defaultServings?: number;
  description?: string;
}) => {
  const mutation = useCreateOrUpdateRecipe(type, recipeId);
  const [form, setForm] = useState({
    name,
    portionWeightG,
    defaultServings,
    description,
  });
  function handleSubmit() {
    mutation.mutate({
      defaultServings: form.defaultServings,
      name: form.name,
      portionWeightG: form.portionWeightG,
      description: form.description,
    });
  }

  return (
    <div className="p-4">
      <label className="block">
        <span className="text-sm font-medium">Название</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="text"
          placeholder="Название"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Описание</span>
        <textarea
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          cols={4}
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Сервировка по умолчанию</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          placeholder="Количество"
          value={form.defaultServings}
          onChange={(e) => setForm({ ...form, defaultServings: Number(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Вес порции в граммах</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          placeholder="Вес в гр."
          value={form.portionWeightG}
          onChange={(e) => setForm({ ...form, portionWeightG: Number(e.target.value) })}
        />
      </label>
      <button onClick={handleSubmit} className="rounded-md border bg-gray-50 p-3 mt-[20px]">
        Сохранить
      </button>
    </div>
  );
};
