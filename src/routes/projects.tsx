import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center">Projects</h1>
      <p className="mt-4">No projects yet ...</p>
    </div>
  )
}
