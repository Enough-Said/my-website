import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { projectsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
  const projects = await db.select().from(projectsTable)
  return projects
})

export const addProject = createServerFn({ method: 'POST' })
  // Check input data is valid
  .validator((data: { 
    title: string; 
    description: string; 
    href: string; 
    linkText?: string }) => data)
  // Add the data to the database after checking we are on host computer
  .handler(async ({ data }) => {
    await db.insert(projectsTable).values({
      title: data.title,
      description: data.description,
      href: data.href,
      linkText: data.linkText || 'View Project',
    })
    
    return { success: true }
  })

export const deleteProject = createServerFn({ method: 'POST' })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await db.delete(projectsTable).where(eq(projectsTable.id, data.id))
    return { success: true }
  })