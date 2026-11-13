import { GoLinkExternal } from "react-icons/go";

interface CardProp {
  title: string
  description: string
  href: string
  linkText?: string
}

export function ProjectCard({
  title,
  description,
  href,
  linkText = 'View Project',
}: CardProp) {
  return (
    <div className="bg-surface border border-secondary/40 rounded-xl p-6 shadow-md hover:shadow-2xl transition-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">
          {title}
        </h3>
        <p className="text-sm leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:opacity-80 transition-opacity w-fit"
      >
        {linkText}
        <GoLinkExternal />
      </a>
    </div>
  )
}