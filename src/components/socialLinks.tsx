import { SiGmail, SiGithub } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";


export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {/* GitHub Link */}
      <a
        href="https://github.com/Enough-Said"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="hover:text-secondary transition-colors"
      >
        <SiGithub className="w-5 h-5" />
      </a>

      {/* LinkedIn Link */}
      <a
        href="https://www.linkedin.com/in/anaf-sayed/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="hover:text-secondary transition-colors"
      >
        <GrLinkedin className="w-5 h-5" />
      </a>
    </div>
  )
}