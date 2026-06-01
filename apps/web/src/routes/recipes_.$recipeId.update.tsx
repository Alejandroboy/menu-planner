import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes_/$recipeId/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/recipes_/$recipeId/update"!</div>
}
