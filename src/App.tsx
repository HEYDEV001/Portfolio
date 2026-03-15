import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { CursorSparkles } from '@/components/ui/cursor-sparkles'

type ProjectTag = 'Product' | 'Web' | 'Backend' | 'Full-stack'

type Project = {
  title: string
  tag: ProjectTag
  year: string
  description: string
  stack: string[]
  live: string
  repo: string
}

type ResumeTab = 'Experience' | 'Technical Skills' | 'Education'

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
  logo: string
}

const projects: Project[] = [
  {
    title: 'Staylio',
    tag: 'Backend',
    year: '2025',
    description:
        'Backend system for an Airbnb-style accommodation platform handling property listings, booking workflows, user authentication, and reservation management through scalable APIs.',
    stack: ['Spring Boot', 'Postgres', 'JWT', 'JAVA'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Staylio-Backend',
  },
  {
    title: 'Sphere',
    tag: 'Backend',
    year: '2026',
    description:
        'Distributed backend system for a professional networking platform using microservices, API gateway routing, and containerized deployment.',
    stack: ['Spring Boot', 'Postgres', 'JWT', 'JAVA','Kafka', 'Redis', 'Microservice Architecture'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Sphere',
  },
  {
    title: 'ECom',
    tag: 'Backend',
    year: '2026',
    description:
        'Scalable e-commerce backend managing product catalogs, order workflows, inventory updates, and secure user authentication through high-performance APIs.',
    stack: ['Spring Boot', 'Postgres', 'JWT', 'JAVA','Kafka', 'Redis', 'Microservice Architecture', 'WebSocket'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Ecommerce',
  },
  {
    title: 'Krishi-setu',
    tag: 'Backend',
    year: '2025',
    description:
        'AI-powered backend service for agricultural assistance that processes farmer queries, integrates ML APIs, and manages data through scalable microservices.',
    stack: ['Spring Boot', 'MySQL', 'JWT', 'JAVA'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/SIH-KrishiSetu',
  },
]

const experience: Experience[] = [
  {
    company: 'Ayurherb',
    role: 'Full-Stack Developer Intern',
    location: 'Remote',
    period: '3-Month Internship (2025)',
    summary:
      'Worked with a startup team to develop and manage web platforms for business operations.',
    highlights: [
      'Built and deployed multiple websites for the company using modern web technologies.',
      'Developed both frontend and backend features to support product and business requirements.',
      'Managed website maintenance, updates, and performance improvements.',
    ],
  },
  {
    company: 'GDG (Google Developers Group)',
    role: 'Web Development Lead ',
    location: 'DAVV Indore, IN',
    period: '2024 — 2025',
    summary:
      'Led web development initiatives for the GDG community, contributing to technical projects and developer events.',
    highlights: [
      'Developed and maintained the official GDG website, improving accessibility and performance.',
      'Collaborated with the organizing team to support multiple GDG events and technical sessions',
      'Managed website updates, deployments, and feature enhancements for community needs.',
      'Contributed to the developer ecosystem by supporting event logistics and technical activities.',
    ],
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Development',
    items: [
      'React.js',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Responsive UI Development',
      'Component-based Architecture'
    ],
  },
  {
    title: 'Backend Development',
    items: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Spring AI',
      'REST API Development',
      'Microservices Architecture'
    ],
  },
  {
    title: 'Databases & Caching',
    items: [
      'MongoDB',
      'PostgreSQL',
      'SQL',
      'Redis'
    ],
  },
  {
    title: 'DevOps & Cloud',
    items: [
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Containerized Deployments'
    ],
  },
  {
    title: 'Distributed Systems',
    items: [
      'Apache Kafka',
      'Event Streaming',
      'Microservices Communication'
    ],
  },
  {
    title: 'Programming & Problem Solving',
    items: [
      'Java',
      'C',
      'C++',
      'Data Structures & Algorithms (DSA)'
    ],
  }
]

const education: Education[] = [
  {
    school: "M.Tech (Integrated) – Artificial Intelligence & Data Science",
    credential: "Devi Ahilya Vishwavidyalaya (DAVV), Indore",
    period: "Aug 2023 – Present",
    note: "Specializing in Artificial Intelligence and Data Science.Focused on scalable systems, machine learning, and software engineering.",
  },
  {
    school: "Higher Secondary (Class XII)",
    credential: "Maharishi Vidya Mandir, Chhatarpur, Madhya Pradesh",
    period: "Apr 2022 – Feb 2023",
    note:
      "Completed senior secondary education with focus on science stream."
  },
  {
    school: "Secondary School (Class X)",
    credential: "Takshashila Public Model High School, Nowgong, Chhatarpur, Madhya Pradesh",
    period: "Apr 2020 – Mar 2021",
    note:
      "Completed foundational secondary education."
  }
]

const socials: Social[] = [
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/Dev Pathak',
    url: 'https://www.linkedin.com/in/dev-pathak-17b067296/',
    note: 'Professional network and recommendations.',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  },
  {
    name: 'GitHub',
    handle: 'github.com/HEYDEV001',
    url: 'https://github.com/HEYDEV001',
    note: 'Open-source work and experiments.',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    name: 'X (Twitter)',
    handle: 'x.com/your-handle',
    url: 'https://x.com/your-handle',
    note: 'Thoughts on product, design, and engineering.',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg',
  },
  {
    name: 'Instagram',
    handle: 'instagram.com/devvvvvvv.p',
    url: 'https://www.instagram.com/devvvvvvv.p/',
    note: 'connect on Instagram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [filter, setFilter] = useState<'All' | ProjectTag>('All')
  const [resumeTab, setResumeTab] = useState<ResumeTab>('Experience')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('devpathak9685@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

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

  return (
    <div className="app">
      <CursorSparkles />
      <header className="nav">
        <div className="brand">
          <span className="badge">Portfolio</span>
          <div>
            <p className="brand-title">Dev Pathak</p>
            <p className="brand-sub">Backend + DevOps Engineer</p>
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
            <p className="eyebrow">ENGINEERING SCALABLE BACKEND SYSTEMS</p>
            <h1>
              I design and build scalable backend systems that power reliable digital products.
            </h1>
            <p className="lede">
              Backend and DevOps engineer specializing in microservices,
              cloud-native architecture, containerized deployments,
              and resilient distributed systems.
            </p>
            <div className="hero-actions">
              <LiquidMetalButton label="Explore my work" onClick={() => window.location.assign('#projects')} />
              <LiquidMetalButton label="View resume" onClick={() => window.location.assign('#resume')} />
            </div>
            <div className="hero-metrics">
              <div className="metric">
                <p className="metricTime">3rd year</p>
                <p className="metricName">Student of M.Tech(AI & DS)</p>
              </div>
              <div className="metric">
                <p className="metricTime">3 months</p>
                <p className="metricName">Full-stack Internship</p>
              </div>
              <div className="metric">
                <p className="metricTime">10+</p>
                <p className="metricName">Projects build</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orb"></div>
            <div className="stack-card">
              <div className="stack-card-inner">
                <p className="label">Now working on</p>
                <h3>Distributed Backend Systems</h3>
                <p>
                  Building scalable backend infrastructure with microservices, service discovery, container orchestration, and automated deployment pipelines.
                </p>
                <div className="chip-row">
                  <span>Spring Boot</span>
                  <span>Microservices</span>
                  <span>Docker</span>
                  <span>Redis</span>
                  <span>Kafka</span>
                </div>
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
            <h2>Scalable backend systems built for real-world workloads.</h2>
            <div className="filters">
              {['All', 'Product', 'Web', 'Backend', 'Full-stack'].map((tag) => (
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
                <div className="project-card-inner">
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="resume" data-section>
          <div className="section-head">
            <p className="eyebrow">Resume</p>
            <h2>Experience designing and operating scalable backend systems.</h2>
          </div>

          <div className="resume-shell">
            <aside className="resume-tabs">
              {(['Experience', 'Technical Skills', 'Education'] as ResumeTab[]).map((tab) => (
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
                <a className="button ghost" href="/dev_pathak_resume.pdf">
                  Download resume
                </a>
              </div>
            </aside>

            <div className="resume-panel">
              <div className="resume-panel-inner">
              {resumeTab === 'Experience' && (
                <div className="timeline">
                  {experience.map((role) => (
                    <div key={role.company} className="timeline-item">
                      <div className="timeline-header">
                        <p className="experience-location">
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

              {resumeTab === 'Technical Skills' && (
                <div className="skills">
                  <div className="skills-grid">
                    {skillGroups.map((group) => (
                      <div key={group.title} className="skill-card">
                        <div className="skill-card-inner">
                          <h3 className="skill-group-title">{group.title}</h3>
                          <div className="skill-items">
                            {group.items.map((item) => (
                              <span key={item} className="skill-pill">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resumeTab === 'Education' && (
                <div className="education">
                  {education.map((entry) => (
                    <div key={entry.school} className="education-item">
                      <p className="School-name">{entry.credential}</p>
                      <h3>{entry.school}</h3>
                      <p className="education-meta">{entry.period}</p>
                      <p>{entry.note}</p>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
        </section>

        <section id="connect" className="connect" data-section>
          <div className="section-head">
            <p className="eyebrow">Connection</p>
            <h2>Let’s build the infrastructure behind great products.</h2>
          </div>

          <div className="connect-grid" style={{ maxWidth: '1420px', margin: '0 auto', gap: '20px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', alignItems: 'stretch' }}>
            <div className="contact-card" style={{ gridRow: 'span 2', width: '100%' }}>
              <div className="contact-card-inner">
                <h3>Direct contact</h3>
                <p>Open to backend engineering, distributed systems, and scalable infrastructure projects.</p>
                <div className="contact-actions">
                  <button className="button copyEmail" onClick={handleCopy}>
                    {copied ? 'Email copied' : 'Copy email'}
                  </button>
                  <a className="button ghost" href="mailto:devpathak9685@gmail.com">
                    Send email
                  </a>
                </div>
                <div className="contact-details">
                  <p>
                    <span>Email</span>
                    devpathak9685@gmail.com
                  </p>
                  <p>
                    <span>Location</span>
                    Indore(M.P.) IN
                  </p>
                  <p>
                    <span>Availability</span>
                    Remote
                  </p>
                </div>
              </div>
            </div>

            <div className="socials" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '1fr', gap: '16px', width: '100%' }}>
              {socials.map((social) => (
                <a
                  key={social.name}
                  className="social-card"
                  style={{ width: '100%', height: '100%' }}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="social-card-inner">
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <img src={social.logo} alt={social.name} style={{width: '33px', height: '33px'}}/>
                      <div>
                        <h3>{social.name}</h3>
                        <p>{social.handle}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Designed and built by Dev Pathak • © 2026</p>
        <div className="footer-links">
          <a href="#home">Back to top</a>
          <a href="mailto:devpathak9685@gmail.com">Email Me</a>
        </div>
      </footer>
    </div>
  )
}

export default App

