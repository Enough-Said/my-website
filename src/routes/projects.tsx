import { createFileRoute } from '@tanstack/react-router'
import { ProjectCard } from '#/components/projectCard'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Projects</h1>
  
      {/* List of projects, in the form of cards*/}
      <div className="grid grid-cols-1 gap-3">
        <ProjectCard 
          title="This Website"
          description="A full-stack project built using Tanstack Start, which is 
          this website."
          href="https://github.com/Enough-Said/my-website"
        />

        <ProjectCard 
          title="This Website"
          description="A full-stack project built using Tanstack Start."
          href="https://github.com/Enough-Said/my-website"
        />
      </div>
    </div>
  )
}
