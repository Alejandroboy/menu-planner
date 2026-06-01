import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu-plans_/$menuPlanId/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/menu-plans_/$menuPlanId/update"!</div>
}
