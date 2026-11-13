import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { projectsTable } from '@/db/schema'

export const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
  const projects = await db.select().from(projectsTable)
  return projects
})