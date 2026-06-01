import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { useCreateRecipe } from '@/api/use-create-recipe.hook';

export const Route = createFileRoute('/recipes/new')({
  component: RecipesNewPage,
});

function RecipesNewPage() {
  const mutation = useCreateRecipe();
  const [form, setForm] = useState({
    name: '',
    portionWeightG: 0,
    defaultServings: 0,
    description: '',
  });
  function handleSubmit() {
    console.log('form', form);
    mutation.mutate({
      defaultServings: form.defaultServings,
      name: form.name,
      portionWeightG: form.portionWeightG,
      description: form.description,
      ingredients: [],
    });
  }

  return (
    <div className="p-4">
      {/*<form onSubmit={handleSubmit}>*/}
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
}
