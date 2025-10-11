import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/jobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-10">
      <h1>Jobs</h1>
    </div>
  )
}
