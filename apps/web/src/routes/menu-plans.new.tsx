import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useCreateMenuPlan } from '@/api/use-create-menu-plan.hook';

export const Route = createFileRoute('/menu-plans/new')({
  component: MenuPlansNewPage,
});

function MenuPlansNewPage() {
  const mutation = useCreateMenuPlan();
  const [form, setForm] = useState({
    name: '',
    date: '',
  });

  function handleSubmit() {
    mutation.mutate({ name: form.name, date: form.date });
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
        <span className="text-sm font-medium">Дата</span>
        <input
          className="mt-1 w-full rounded-xl border p-3 outline-none"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </label>
      <button onClick={handleSubmit} className="rounded-md border bg-gray-50 p-3 mt-[20px]">
        Сохранить
      </button>
    </div>
  );
}
