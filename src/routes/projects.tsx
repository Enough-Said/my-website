import { createFileRoute } from '@tanstack/react-router'
import { ProjectCard } from '#/components/projectCard'
import { getProjects } from '#/utils/projects'

export const Route = createFileRoute('/projects')({
  loader: async () => {
    // Get projects from database on page load
    const projects = await getProjects()
    return { projects }
  },
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects } = Route.useLoaderData()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Projects</h1>
  
      {/* List of projects, in the form of cards*/}
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            href={project.href}
            linkText={project.linkText ?? 'View Project'}
          />
        ))}
      </div>
    </div>
  )
}
