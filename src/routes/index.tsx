import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center">Welcome to my website!</h1>
      <p className="mt-4 text-lg text-center">
        My name is Anaf, and I'm passionate about bioinformatics and biostatistics.
        <br />
        Check out my{' '}
        <Link to="/projects" className="text-secondary underline hover:opacity-80">
          projects
        </Link>.
      </p>
    </div>
  )
}
