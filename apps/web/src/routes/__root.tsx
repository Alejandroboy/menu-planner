import * as React from 'react';
import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/menu-plans" className="[&.active]:font-bold">
          Планы меню
        </Link>
        <Link to="/ingredients" className="[&.active]:font-bold">
          Ингредиенты
        </Link>
        <Link to="/recipes" className="[&.active]:font-bold">
          Рецепты
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
