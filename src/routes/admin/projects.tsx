import { createFileRoute, useRouter } from '@tanstack/react-router'
import { addProject, getProjects, deleteProject } from '@/utils/projects'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { FaTrash } from "react-icons/fa";

export const Route = createFileRoute('/admin/projects')({
  loader: async () => {
    const projects = await getProjects()
    return { projects }
  },
  component: RouteComponent,
  errorComponent: () => (
    <div>
      <p>Forbidden: You do not have access to this page</p>
    </div>
  ),
})

function RouteComponent() {
  const router = useRouter();
  const { projects } = Route.useLoaderData()
  const [formMsg, setFormMsg] = useState('')

  const form = useForm({
    // Set form variables and default values
    defaultValues: {
      title: '',
      description: '',
      href: '',
      linkText: 'View Project',
    },

    // How to handle submitted form
    onSubmit: async ({ value }) => {
      try {
        await addProject({data: {
          title: value.title,
          description: value.description,
          href: value.href,
          linkText: value.linkText || 'View Project',
        }})

        form.reset()
        console.log('Project added successfully!')
        setFormMsg("Submitted successfully!")
        router.invalidate()
      } catch (err: any) {
        console.error(err.message || "Failed to add project")
        setFormMsg("Failed to add project")
      }
    },
  })


  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Admin: Add Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        {/* Title */}
        <div>
          <form.Field 
            name="title"
            validators={{
              onChange: ({ value }) => (!value ? 'Title is required' : undefined),
            }}
          >{(field) => (
            <div>
              <label className="mr-2">Project Title </label>
              {field.state.meta.errors.length > 0 && (
                <em style={{ color: 'red' }}>
                  {field.state.meta.errors.join(', ')}
                </em>
              )}
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 rounded border border-secondary bg-surface focus:outline-primary"
              />
            </div>
          )}</form.Field>
        </div>

        {/* Description */}
         <form.Field 
          name="description"
          validators={{}}
        >{(field) => (
          <div>
            <label>Description</label>
            <textarea
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              className="w-full p-2 rounded border border-secondary bg-surface focus:outline-primary"
            />
          </div>
        )}</form.Field>

        {/* Link */}
        <div>
          <form.Field 
            name="href"
            validators={{
              onChange: ({ value }) => (!value ? 'URL is required' : undefined),
            }}
          >{(field) => (
            <div>
              <label className="mr-2">URL </label>
              {field.state.meta.errors.length > 0 && (
                <em style={{ color: 'red' }}>
                  {field.state.meta.errors.join(', ')}
                </em>
              )}
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 rounded border border-secondary bg-surface focus:outline-primary"
              />
            </div>
          )}</form.Field>
        </div>

        {/* Link Text */}
        <div>
          <form.Field 
            name="linkText"
            validators={{}}
          >{(field) => (
            <div>
              <label className="mr-2">Link Text </label>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 rounded border border-secondary bg-surface focus:outline-primary"
              />
            </div>
          )}</form.Field>
        </div>
        
        <div className="mt-2">
          <span className="mr-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="bg-primary text-white px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Project to Database'}
                </button>
              )}
            </form.Subscribe>
          </span>
          
          {formMsg}
        </div>


      </form>

      {/* Look at projects so I can also delete them */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
        
        <div className="bg-surface rounded-xl border border-accent overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-secondary/20 bg-secondary/5 text-xs uppercase tracking-wider text-primary">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10 text-sm">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-secondary">
                    No projects found in the database yet.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-secondary/5 transition-colors">
                    <td className="p-4 font-medium text-text-main align-top w-1/4">
                      {project.title}
                    </td>
                    <td className="p-4 text-secondary align-top font-mono text-xs line-clamp-2 w-2/3">
                      {project.description}
                    </td>
                    <td className="p-4 text-right align-top w-1/12">
                      <button
                        onClick={() => {
                          deleteProject({data: {id: project.id}})
                          router.invalidate()
                        }}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
