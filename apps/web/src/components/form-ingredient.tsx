import { useCreateOrUpdateIngredient } from '@/api/use-create-or-update-ingredient';
import { useState } from 'react';

export const FormIngredient = ({
  type = 'create',
  ingredientId = 0,
  name = '',
  unitId = 1,
  gramsPerUnit = 0,
  lossCold = 0,
  lossFry = 0,
  lossBoil = 0,
  lossBake = 0,
}: {
  type: string;
  ingredientId?: number;
  name?: string;
  unitId?: number;
  gramsPerUnit?: number;
  lossCold?: number;
  lossFry?: number;
  lossBoil?: number;
  lossBake?: number;
}) => {
  const mutation = useCreateOrUpdateIngredient(type, ingredientId);

  const [form, setForm] = useState({
    name: name,
    unitId: unitId,
    gramsPerUnit: gramsPerUnit,
    lossCold: lossCold,
    lossFry: lossFry,
    lossBoil: lossBoil,
    lossBake: lossBake,
  });

  function handleSubmit() {
    mutation.mutate({
      name: form.name,
      unitId: form.unitId,
      gramsPerUnit: form.gramsPerUnit,
      lossCold: form.lossCold,
      lossFry: form.lossFry,
      lossBoil: form.lossBoil,
      lossBake: form.lossBake,
    });
  }

  return (
    <div className="p-4">
      <label className="block">
        <span className="text-sm font-medium">Название</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Юнит</span>
        <select
          value={form.unitId}
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          onChange={(e) => setForm({ ...form, unitId: Number(e.target.value) })}
        >
          <option value="1">гр.</option>
          <option value="2">кг.</option>
          <option value="3">шт.</option>
          <option value="4">л.</option>
        </select>
        {/*<input*/}
        {/*  className="mt-1 w-full rounded-xl border p-3 outline-none"*/}
        {/*  type="text"*/}
        {/*  value={form.unitId}*/}
        {/*  onChange={(e) => setForm({ ...form, unitId: Number(e.target.value) })}*/}
        {/*/>*/}
      </label>
      <label className="block">
        <span className="text-sm font-medium">Грамм на юнит</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="text"
          value={form.gramsPerUnit}
          onChange={(e) => setForm({ ...form, gramsPerUnit: Number(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Потери при заморозке</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          step="0.01"
          min="0"
          value={form.lossCold}
          onChange={(e) => setForm({ ...form, lossCold: Number(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Потери при жарке</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          step="0.01"
          min="0"
          value={form.lossFry}
          onChange={(e) => setForm({ ...form, lossFry: Number(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Потери при кипячении</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          step="0.01"
          min="0"
          value={form.lossBoil}
          onChange={(e) => setForm({ ...form, lossBoil: Number(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Потери при выпекании:</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="number"
          step="0.01"
          min="0"
          value={form.lossBake}
          onChange={(e) => setForm({ ...form, lossBake: Number(e.target.value) })}
        />
      </label>
      <button onClick={handleSubmit} className="rounded-md border bg-gray-50 p-3 mt-[20px]">
        {type === 'create' ? 'Создать' : 'Обновить'}
      </button>
    </div>
  );
};
