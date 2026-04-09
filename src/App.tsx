import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'
import { AboutTerminal } from './components/AboutTerminal'
import { BinaryRain } from './components/BinaryRain'
import { CustomCursor } from './components/CustomCursor'
import { HeroBootSequence } from './components/HeroBootSequence'
import { MagneticButton } from './components/MagneticButton'
import { ProjectModal } from './components/ProjectModal'
import { TiltPanel } from './components/TiltPanel'
import { projects, skills, teamMembers } from './data/portfolio'

function App() {
  const sections = useMemo(
    () => ['hero', 'about', 'skills', 'projects', 'team', 'contact'],
    [],
  )
  const [activeSection, setActiveSection] = useState('hero')
  const [heroBackgroundActive, setHeroBackgroundActive] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [modalProject, setModalProject] = useState<(typeof projects)[number] | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success'>('idle')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry?.target instanceof HTMLElement) {
          setActiveSection(visibleEntry.target.dataset.section ?? 'hero')
        }
      },
      {
        threshold: [0.35, 0.6, 0.85],
      },
    )

    const sectionElements = document.querySelectorAll<HTMLElement>('[data-section]')
    sectionElements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitState('sending')

    window.setTimeout(() => {
      form.reset()
      setSubmitState('success')
      window.setTimeout(() => setSubmitState('idle'), 2200)
    }, 850)
  }

  return (
    <div className="app-shell">
      <CustomCursor />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-left" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-right" aria-hidden="true" />

      <main className="snap-container">
        <section
          id="hero"
          data-section="hero"
          className={`section hero-section ${activeSection === 'hero' ? 'is-visible' : ''}`}
        >
          <BinaryRain active={heroBackgroundActive} />
          <div className="section-frame hero-frame">
            <HeroBootSequence
              onAccess={() => scrollToSection('about')}
              onBackgroundActivation={() => setHeroBackgroundActive(true)}
            />
          </div>
        </section>

        <section
          id="about"
          data-section="about"
          className={`section ${activeSection === 'about' ? 'is-visible' : ''}`}
        >
          <div className="section-frame section-grid">
            <div className="section-copy">
              <p className="section-label">System Profile</p>
              <h2 className="section-title">Operator overview in terminal format.</h2>
              <p className="section-description">
                A concise execution view focused on adversarial thinking, secure architecture, and measurable defense outcomes.
              </p>
            </div>
            <AboutTerminal active={activeSection === 'about'} />
          </div>
        </section>

        <section
          id="skills"
          data-section="skills"
          className={`section ${activeSection === 'skills' ? 'is-visible' : ''}`}
        >
          <div className="section-frame stacked-layout">
            <div className="section-copy centered-copy">
              <p className="section-label">Security Grid</p>
              <h2 className="section-title">Tools, languages, and defense domains.</h2>
              <p className="section-description">
                Practical capabilities across offensive simulation, detection engineering, network defense, and cloud-native security operations.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <TiltPanel
                  key={skill.title}
                  className={`tilt-shell skill-card ${activeSection === 'skills' ? 'is-visible' : ''}`}
                  innerClassName="skill-card__inner"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <span className="skill-card__title">{skill.title}</span>
                  <ul className="skill-card__list">
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </TiltPanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          data-section="projects"
          className={`section ${activeSection === 'projects' ? 'is-visible' : ''}`}
        >
          <div className="section-frame projects-layout">
            <div className="section-copy centered-copy narrow-copy">
              <p className="section-label">Focused Operations</p>
              <h2 className="section-title">Three high-signal security projects.</h2>
              <p className="section-description">
                Each card highlights a controlled engagement, a defensive build, or a response workflow with direct business impact.
              </p>
            </div>

            <div className="project-stack" role="list" aria-label="Projects">
              {projects.map((project, index) => {
                const offset = index - activeProject
                const isCurrent = index === activeProject

                return (
                  <button
                    key={project.name}
                    type="button"
                    className={`project-card ${isCurrent ? 'is-current' : ''}`}
                    style={{
                      transform: `translate3d(${offset * 10}%, ${Math.abs(offset) * 1.4}rem, 0) scale(${isCurrent ? 1 : 0.92})`,
                      opacity: isCurrent ? 1 : 0.38,
                      zIndex: projects.length - Math.abs(offset),
                    }}
                    onMouseEnter={() => setActiveProject(index)}
                    onFocus={() => setActiveProject(index)}
                    onClick={() => setModalProject(project)}
                  >
                    <TiltPanel className="tilt-shell project-card__shell" innerClassName="project-card__inner">
                      <span className="project-card__tag">{project.tag}</span>
                      <h3>{project.name}</h3>
                      <p>{project.blurb}</p>
                      <span className="project-card__cta">Open dossier</span>
                    </TiltPanel>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="team"
          data-section="team"
          className={`section ${activeSection === 'team' ? 'is-visible' : ''}`}
        >
          <div className="section-frame stacked-layout">
            <div className="section-copy centered-copy">
              <p className="section-label">Trusted Network</p>
              <h2 className="section-title">Cross-functional execution partners.</h2>
              <p className="section-description">
                Security programs land faster when engineering, response, and governance align around the same operating picture.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <TiltPanel
                  key={member.name}
                  className={`tilt-shell team-card ${activeSection === 'team' ? 'is-visible' : ''}`}
                  innerClassName="team-card__inner"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="team-avatar" aria-hidden="true">
                    <span>{member.initials}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-summary">{member.summary}</p>
                </TiltPanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          data-section="contact"
          className={`section ${activeSection === 'contact' ? 'is-visible' : ''}`}
        >
          <div className="section-frame contact-layout">
            <div className="section-copy narrow-copy">
              <p className="section-label">Secure Channel</p>
              <h2 className="section-title">Open a direct conversation.</h2>
              <p className="section-description">
                For consulting, engineering roles, or security collaborations, use the controlled intake form and I will respond with next-step coordination.
              </p>
            </div>

            <TiltPanel className="tilt-shell contact-card" innerClassName="contact-card__inner">
              <form className={`contact-form ${submitState}`} onSubmit={handleSubmit}>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Operator name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="secure@inbox.dev" required />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe the mission, role, or engagement scope."
                    required
                  />
                </label>

                <div className="contact-actions">
                  <MagneticButton className="cta-button cta-button--wide" type="submit">
                    {submitState === 'sending'
                      ? 'Encrypting...'
                      : submitState === 'success'
                        ? 'Transmission Sent'
                        : 'Send Secure Message'}
                  </MagneticButton>
                  <span className={`form-status ${submitState === 'success' ? 'is-visible' : ''}`}>
                    Secure channel established.
                  </span>
                </div>
              </form>
            </TiltPanel>
          </div>
        </section>
      </main>

      <nav className="section-dots" aria-label="Section navigation">
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={activeSection === section ? 'is-active' : ''}
            onClick={() => scrollToSection(section)}
            aria-label={`Go to ${section}`}
          />
        ))}
      </nav>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  )
}

export default App