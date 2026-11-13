import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const projectsTable = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  href: text('href').notNull(),
  linkText: text('link_text').default('View Project'),
})

export type Project = typeof projectsTable.$inferSelect
export type NewProject = typeof projectsTable.$inferInsert