import { Link } from '@tanstack/react-router'
import { SocialLinks } from './socialLinks'

export function NavBar() {
  return (
    <nav className="flex gap-4 p-4 bg-primary text-surface">
      <Link to="/" className="[&.active]:font-bold hover:text-secondary transition-colors">
        Home
      </Link>
      <Link to="/projects" className="[&.active]:font-bold hover:text-secondary transition-colors">
        Projects
      </Link>
      <div className="ml-auto">
      <SocialLinks />
      </div>
    </nav>
  )
}