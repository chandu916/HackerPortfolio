import { useEffect } from 'react'
import { projects } from '../data/portfolio'
import { MagneticButton } from './MagneticButton'

type Project = (typeof projects)[number]

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose, project])

  if (!project) {
    return null
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="modal-card">
        <div className="modal-card__header">
          <div>
            <p className="section-label">{project.tag}</p>
            <h3 id="project-modal-title">{project.name}</h3>
          </div>
          <MagneticButton className="cta-button modal-card__close" onClick={onClose} aria-label="Close project modal">
            x
          </MagneticButton>
        </div>

        <p>{project.description}</p>

        <div className="modal-meta">
          <div>
            <p className="section-label">Tech Stack</p>
            <ul className="modal-stack">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">Links</p>
            <div className="modal-links">
              {project.links.map((link) => (
                <a key={link.label} className="modal-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}