import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: MainPage,
});

function MainPage() {
  return (
    <div className="flex gap-2 p-2">
      <Link to="/menu-plans" className="border p-2 rounded-md">
        Планы питания
      </Link>
      <Link to="/ingredients" className="border p-2 rounded-md">
        Ингредиенты
      </Link>
      <Link to="/recipes" className="border p-2 rounded-md">
        Рецепты
      </Link>
    </div>
  );
}
