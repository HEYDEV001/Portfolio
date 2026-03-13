import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'

type ProjectTag = 'Product' | 'Web' | 'Mobile' | 'AI'

type Project = {
  title: string
  tag: ProjectTag
  year: string
  description: string
  stack: string[]
  live: string
  repo: string
}

type ResumeTab = 'Experience' | 'Skills' | 'Education'

type Experience = {
  company: string
  role: string
  location: string
  period: string
  summary: string
  highlights: string[]
}

type SkillGroup = {
  title: string
  items: string[]
}

type Education = {
  school: string
  credential: string
  period: string
  note: string
}

type Social = {
  name: string
  handle: string
  url: string
  note: string
}

const projects: Project[] = [
  {
    title: 'PulseBoard Analytics',
    tag: 'Product',
    year: '2025',
    description:
      'A KPI cockpit for fast-moving teams with live funnels, anomaly pings, and guided actions.',
    stack: ['React', 'D3', 'Node', 'Postgres'],
    live: '#',
    repo: '#',
  },
  {
    title: 'CityLoom',
    tag: 'Web',
    year: '2024',
    description:
      'A civic storytelling microsite with interactive maps, timelines, and multi-lingual support.',
    stack: ['Next.js', 'Mapbox', 'MDX'],
    live: '#',
    repo: '#',
  },
  {
    title: 'FocusArc Mobile',
    tag: 'Mobile',
    year: '2024',
    description:
      'A calm productivity coach that blends habit loops, ambient soundscapes, and focus stats.',
    stack: ['React Native', 'Expo', 'SQLite'],
    live: '#',
    repo: '#',
  },
  {
    title: 'Verge AI Assist',
    tag: 'AI',
    year: '2025',
    description:
      'An internal AI assistant that drafts customer replies, summarizes threads, and tags sentiment.',
    stack: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
    live: '#',
    repo: '#',
  },
]

const experience: Experience[] = [
  {
    company: 'Northwind Studio',
    role: 'Senior Product Designer & Frontend Engineer',
    location: 'Remote',
    period: '2023 — Present',
    summary:
      'Leading the end‑to‑end experience for analytics and workflow tools used by cross‑functional product teams.',
    highlights: [
      'Redesigned the core analytics surface, increasing feature adoption and session depth.',
      'Partnered with engineering to define a scalable component library across multiple products.',
      'Built high‑fidelity prototypes in React to validate interaction patterns with real data.',
    ],
  },
  {
    company: 'Atlas Systems',
    role: 'Product Designer · UX Engineer',
    location: 'Bangalore, IN',
    period: '2020 — 2023',
    summary:
      'Owned onboarding, billing, and admin surfaces for a B2B SaaS platform serving mid‑market customers.',
    highlights: [
      'Shipped an onboarding revamp that reduced time‑to‑value from weeks to days.',
      'Introduced a research cadence that increased weekly qualitative touchpoints.',
      'Implemented responsive UI and micro‑interactions that reduced support tickets.',
    ],
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Product & UX',
    items: [
      'Product discovery & opportunity mapping',
      'User journeys, story mapping, and flows',
      'Interaction & motion design for web and mobile',
      'Design systems and tokens at scale',
    ],
  },
  {
    title: 'Frontend & Prototyping',
    items: [
      'React, TypeScript, Next.js',
      'Design‑to‑code handoff and UI engineering',
      'Accessible, responsive layouts and components',
      'Data‑heavy UI (tables, charts, live states)',
    ],
  },
  {
    title: 'Collaboration',
    items: [
      'Partnering with PM/Eng on roadmaps',
      'Facilitating workshops and critiques',
      'Writing product specs and UX docs',
      'Mentoring designers and engineers',
    ],
  },
]

const education: Education[] = [
  {
    school: 'Your University Name',
    credential: 'B.Tech · Computer Science',
    period: '2016 — 2020',
    note: 'Graduated with distinction; led the design & dev team for the annual tech fest.',
  },
]

const socials: Social[] = [
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/your-handle',
    url: 'https://linkedin.com/in/your-handle',
    note: 'Professional network and recommendations.',
  },
  {
    name: 'GitHub',
    handle: 'github.com/your-handle',
    url: 'https://github.com/your-handle',
    note: 'Open-source work and experiments.',
  },
  {
    name: 'X (Twitter)',
    handle: 'x.com/your-handle',
    url: 'https://x.com/your-handle',
    note: 'Thoughts on product, design, and engineering.',
  },
  {
    name: 'Dribbble',
    handle: 'dribbble.com/your-handle',
    url: 'https://dribbble.com/your-handle',
    note: 'UI explorations and motion concepts.',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [filter, setFilter] = useState<'All' | ProjectTag>('All')
  const [resumeTab, setResumeTab] = useState<ResumeTab>('Experience')
  const [copied, setCopied] = useState(false)

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((project) => project.tag === filter)
  }, [filter])

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-section]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id') || 'home')
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const root = document.documentElement
      root.style.setProperty('--mx', `${event.clientX}px`)
      root.style.setProperty('--my', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@yourdomain.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="app">
      <header className="nav">
        <div className="brand">
          <span className="badge">Portfolio</span>
          <div>
            <p className="brand-title">Your Name</p>
            <p className="brand-sub">Product Designer + Frontend Engineer</p>
          </div>
        </div>
        <nav className="nav-links">
          {[
            ['home', 'Home'],
            ['projects', 'Projects'],
            ['resume', 'Resume'],
            ['connect', 'Connect'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
            >
              {label}
            </a>
          ))}
        </nav>
        <LiquidMetalButton
          label="Start a project"
          onClick={() => window.location.assign('#connect')}
        />
      </header>

      <main>
        <section id="home" className="hero" data-section>
          <div className="hero-copy">
            <p className="eyebrow">Crafting intentional digital experiences</p>
            <h1>
              I design and build immersive products that feel effortless to use.
            </h1>
            <p className="lede">
              A modern, interaction-first portfolio that highlights product strategy, UX craft, and
              engineering execution.
            </p>
            <div className="hero-actions">
              <LiquidMetalButton label="Explore my work" onClick={() => window.location.assign('#projects')} />
              <LiquidMetalButton label="View resume" onClick={() => window.location.assign('#resume')} />
            </div>
            <div className="hero-metrics">
              <div className="metric">
                <p className="metricTime">8+</p>
                <p className="metricName">Years of experience</p>
              </div>
              <div className="metric">
                <p className="metricTime">30+</p>
                <p className="metricName">Products shipped</p>
              </div>
              <div className="metric">
                <p className="metricTime">12</p>
                <p className="metricName">Design systems launched</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orb"></div>
            <div className="stack-card">
              <p className="label">Now working on</p>
              <h3>Studio-grade onboarding flows</h3>
              <p>
                Streamlining enterprise onboarding with modular journeys and guided support.
              </p>
              <div className="chip-row">
                <span>Research</span>
                <span>Prototyping</span>
                <span>Front-end</span>
              </div>
            </div>
            <div className="floating-panel">
              <p>Live prototype</p>
              <div className="progress">
                <span style={{ width: '72%' }}></span>
              </div>
              <div className="panel-footer">
                <span>72% complete</span>
                <span>3 days left</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects" data-section>
          <div className="section-head">
            <p className="eyebrow">Selected projects</p>
            <h2>Interactive experiences with measurable outcomes.</h2>
            <div className="filters">
              {['All', 'Product', 'Web', 'Mobile', 'AI'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag as 'All' | ProjectTag)}
                  className={filter === tag ? 'active' : ''}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="card-top">
                  <span className="tag">{project.tag}</span>
                  <span className="year">{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="resume" data-section>
          <div className="section-head">
            <p className="eyebrow">Resume</p>
            <h2>Strategy, systems, and execution across product lifecycles.</h2>
          </div>

          <div className="resume-shell">
            <aside className="resume-tabs">
              {(['Experience', 'Skills', 'Education'] as ResumeTab[]).map((tab) => (
                <button
                  key={tab}
                  className={resumeTab === tab ? 'active' : ''}
                  onClick={() => setResumeTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <div className="resume-cta">
                <p>Need the full PDF?</p>
                <a className="button ghost" href="/resume.pdf">
                  Download resume
                </a>
              </div>
            </aside>

            <div className="resume-panel">
              {resumeTab === 'Experience' && (
                <div className="timeline">
                  {experience.map((role) => (
                    <div key={role.company} className="timeline-item">
                      <div className="timeline-header">
                        <p className="eyebrow small">
                          {role.period} · {role.location}
                        </p>
                        <h3>
                          {role.role} · {role.company}
                        </h3>
                      </div>
                      <p className="timeline-summary">{role.summary}</p>
                      <ul>
                        {role.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {resumeTab === 'Skills' && (
                <div className="skills">
                  {skillGroups.map((group) => (
                    <div key={group.title} className="skill-group">
                      <p className="eyebrow small">{group.title}</p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {resumeTab === 'Education' && (
                <div className="education">
                  {education.map((entry) => (
                    <div key={entry.school} className="education-item">
                      <p className="eyebrow small">{entry.credential}</p>
                      <h3>{entry.school}</h3>
                      <p className="education-meta">{entry.period}</p>
                      <p>{entry.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="connect" className="connect" data-section>
          <div className="section-head">
            <p className="eyebrow">Connection</p>
            <h2>Let&apos;s build something sharp, calm, and memorable.</h2>
          </div>

          <div className="connect-grid">
            <div className="contact-card">
              <h3>Direct contact</h3>
              <p>Available for select freelance and product engagements.</p>
              <div className="contact-actions">
                <button className="button copyEmail " onClick={handleCopy}>
                  {copied ? 'Email copied' : 'Copy email'}
                </button>
                <a className="button ghost" href="mailto:hello@yourdomain.com">
                  Send email
                </a>
              </div>
              <div className="contact-details">
                <p>
                  <span>Email</span>
                  hello@yourdomain.com
                </p>
                <p>
                  <span>Location</span>
                  Your city · Remote
                </p>
                <p>
                  <span>Availability</span>
                  Booking 2026
                </p>
              </div>
            </div>

            <div className="socials">
              {socials.map((social) => (
                <a
                  key={social.name}
                  className="social-card"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <h3>{social.name}</h3>
                    <p>{social.handle}</p>
                  </div>
                  <span className="arrow">→</span>
                  <small>{social.note}</small>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Designed and built by Your Name • © 2026</p>
        <div className="footer-links">
          <a href="#home">Back to top</a>
          <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>
        </div>
      </footer>
    </div>
  )
}

export default App

