import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Copy, FileText, FolderGit2 } from 'lucide-react'
import './App.css'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar'

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
}

const navSections: (LiquidNavItem & { id: string })[] = [
  { id: 'home', label: 'Home', href: '#home', icon: NimbusIcons.home, fx: 'glow' },
  { id: 'projects', label: 'Projects', href: '#projects', icon: <FolderGit2 size={18} strokeWidth={1.8} />, fx: 'spin' },
  { id: 'resume', label: 'Resume', href: '#resume', icon: <FileText size={18} strokeWidth={1.8} />, fx: 'drop' },
  { id: 'connect', label: 'Connect', href: '#connect', icon: NimbusIcons.plane, fx: 'plane' },
]

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
  },
  {
    name: 'GitHub',
    handle: 'github.com/HEYDEV001',
    url: 'https://github.com/HEYDEV001',
  },
  {
    name: 'X (Twitter)',
    handle: 'x.com/your-handle',
    url: 'https://x.com/your-handle',
  },
  {
    name: 'Instagram',
    handle: 'instagram.com/devvvvvvv.p',
    url: 'https://www.instagram.com/devvvvvvv.p/',
  },
]

const marqueeWords = [
  'Backend engineering',
  'Distributed systems',
  'Microservices',
  'DevOps',
  'Cloud-native',
  'Kafka',
  'Kubernetes',
]

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.9, delay, ease },
})

const resumeTabs: ResumeTab[] = ['Experience', 'Skills', 'Education']

const resumeCounts: Record<ResumeTab, number> = {
  Experience: experience.length,
  Skills: skillGroups.length,
  Education: education.length,
}

const rowReveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay: 0.08 * i, ease },
})

function RevealTitle({ text }: { text: string }) {
  return (
    // The heading triggers the reveal: masked words start clipped, so they can't observe themselves
    <motion.h2
      className="display-title"
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.08 }}
    >
      {text.split(' ').map((word, i) => (
        <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
            transition={{ duration: 1, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

function Hairline({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={`hairline ${className}`}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease }}
    />
  )
}

function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  // The rail fills as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div ref={ref} className="timeline">
      <span className="timeline-rail" aria-hidden="true">
        <motion.span className="timeline-progress" style={{ scaleY: progress }} />
      </span>
      <ol className="resume-list">{children}</ol>
    </div>
  )
}

type TimelineRowProps = {
  index: number
  meta: string[]
  title: string
  sub: string
  text: string
  points?: string[]
}

function TimelineRow({ index, meta, title, sub, text, points }: TimelineRowProps) {
  return (
    <motion.li className="resume-row" {...rowReveal(index)}>
      <div className="row-meta">
        {meta.map((item, i) => (
          <span key={item} className={i === 0 ? 'row-period' : undefined}>
            {item}
          </span>
        ))}
      </div>
      <motion.span
        className="row-dot"
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.7, delay: 0.25 }}
      />
      <div className="row-main">
        <p className="row-sub">
          <span className="row-index">{String(index + 1).padStart(2, '0')}</span>
          {sub}
        </p>
        <h3 className="row-title">{title}</h3>
        <p className="row-text">{text}</p>
        {points && (
          <ul className="row-points">
            {points.map((item, j) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + 0.07 * j, ease }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
}

const istTime = new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
})

function LocalTime() {
  const [time, setTime] = useState(() => istTime.format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(istTime.format(new Date())), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return <>{time} IST</>
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [filter, setFilter] = useState<'All' | ProjectTag>('All')
  const [resumeTab, setResumeTab] = useState<ResumeTab>('Experience')
  const [copied, setCopied] = useState(false)
  // While smooth-scrolling to a clicked section, ignore the sections passed on the way
  const scrollTarget = useRef<string | null>(null)
  const scrollTimer = useRef<number | undefined>(undefined)

  const handleNavChange = (index: number) => {
    const id = navSections[index].id
    setActiveSection(id)
    scrollTarget.current = id
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      scrollTarget.current = null
    }, 1200)
  }

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
            const id = entry.target.getAttribute('id') || 'home'
            entry.target.classList.add('is-visible')
            if (scrollTarget.current && scrollTarget.current !== id) return
            scrollTarget.current = null
            setActiveSection(id)
          }
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <AuroraBackground className="fixed inset-0 -z-10 h-auto" aria-hidden="true" />
      <header className="nav">
        <div className="brand">
          <span className="badge">Portfolio</span>
          <div>
            <p className="brand-title">Dev Pathak</p>
            <p className="brand-sub">Backend + DevOps Engineer</p>
          </div>
        </div>
        <div className="nav-links">
          <LiquidNavbar
            tone="light"
            items={navSections}
            active={Math.max(0, navSections.findIndex((section) => section.id === activeSection))}
            onChange={handleNavChange}
            style={{ fontFamily: 'var(--body)' }}
          />
        </div>
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
          <MotionConfig reducedMotion="user">
            <div className="resume-top">
              <motion.p className="eyebrow" {...fadeUp(0)}>
                <span className="section-index">03</span>
                Resume
              </motion.p>
              <Hairline className="resume-top-line" delay={0.15} />
              <motion.div {...fadeUp(0.25)}>
                <a className="cta-pill cta-pill--small" href="/dev_pathak_resume.pdf" download>
                  Download PDF
                  <span className="cta-icon cta-icon--down">
                    <ArrowDown size={16} />
                    <ArrowDown size={16} />
                  </span>
                </a>
              </motion.div>
            </div>

            <div className="resume-head">
              <RevealTitle text="Experience, skills & education." />
              <motion.p className="panel-lede" {...fadeUp(0.35)}>
                Designing and operating scalable backend systems, from first commit to production.
              </motion.p>
            </div>

            <motion.div className="resume-tabs" role="tablist" aria-label="Resume sections" {...fadeUp(0.45)}>
              {resumeTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={resumeTab === tab}
                  className={resumeTab === tab ? 'active' : ''}
                  onClick={() => setResumeTab(tab)}
                >
                  <span className="tab-label">{tab}</span>
                  <sup className="tab-count">{String(resumeCounts[tab]).padStart(2, '0')}</sup>
                  {resumeTab === tab && (
                    <motion.span
                      layoutId="resume-tab-line"
                      className="tab-line"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            <div className="resume-body" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={resumeTab}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease }}
                >
                  {resumeTab === 'Experience' && (
                    <Timeline>
                      {experience.map((role, i) => (
                        <TimelineRow
                          key={role.company}
                          index={i}
                          meta={[role.period, role.location]}
                          title={role.role}
                          sub={role.company}
                          text={role.summary}
                          points={role.highlights}
                        />
                      ))}
                    </Timeline>
                  )}

                  {resumeTab === 'Skills' && (
                    <div className="skill-list">
                      {skillGroups.map((group, i) => (
                        <motion.div key={group.title} className="skill-row" {...rowReveal(i)}>
                          <Hairline delay={0.08 * i} />
                          <div className="skill-row-head">
                            <span className="row-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3>{group.title}</h3>
                          </div>
                          <ul className="skill-tags">
                            {group.items.map((item, j) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.08 * i + 0.03 * j + 0.15, ease }}
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {resumeTab === 'Education' && (
                    <Timeline>
                      {education.map((entry, i) => (
                        <TimelineRow
                          key={entry.school}
                          index={i}
                          meta={[entry.period]}
                          title={entry.school}
                          sub={entry.credential}
                          text={entry.note}
                        />
                      ))}
                    </Timeline>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </MotionConfig>
        </section>

        <section id="connect" className="connect" data-section>
          <MotionConfig reducedMotion="user">
            <div className="glass-panel">
              <div className="panel-top">
                <p className="eyebrow">Contact</p>
                <span className="connect-status">
                  <span className="status-dot" />
                  Available for new projects
                </span>
              </div>

              <RevealTitle text="Let’s build something that scales." />

              <motion.p className="panel-lede" {...fadeUp(0.35)}>
                Open to backend engineering, distributed systems, and scalable infrastructure projects.
              </motion.p>

              <motion.button type="button" className="email-line" onClick={handleCopy} {...fadeUp(0.45)}>
                <span className="email-text">devpathak9685@gmail.com</span>
                <span className="email-hint">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'copied' : 'copy'}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.button>

              <motion.div className="connect-actions" {...fadeUp(0.55)}>
                <a className="cta-pill" href="mailto:devpathak9685@gmail.com">
                  Start a conversation
                  <span className="cta-icon">
                    <ArrowUpRight size={18} />
                    <ArrowUpRight size={18} />
                  </span>
                </a>
                <a className="connect-link" href="/dev_pathak_resume.pdf">
                  Download resume
                </a>
              </motion.div>

              <div className="connect-bottom">
                <motion.dl className="connect-meta" {...fadeUp(0.1)}>
                  <div>
                    <dt>Based in</dt>
                    <dd>Indore, India</dd>
                  </div>
                  <div>
                    <dt>Works</dt>
                    <dd>Remote</dd>
                  </div>
                  <div>
                    <dt>Local time</dt>
                    <dd>
                      <LocalTime />
                    </dd>
                  </div>
                </motion.dl>

                <ul className="social-list">
                  {socials.map((social, i) => (
                    <motion.li
                      key={social.name}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.8, delay: 0.08 * i, ease }}
                    >
                      <a className="social-row" href={social.url} target="_blank" rel="noreferrer">
                        <span className="social-index">{String(i + 1).padStart(2, '0')}</span>
                        <span className="social-name">{social.name}</span>
                        <span className="social-handle">{social.handle}</span>
                        <ArrowUpRight className="social-arrow" size={20} />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="connect-marquee" aria-hidden="true">
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <div className="marquee-group" key={copy}>
                    {marqueeWords.map((word) => (
                      <span key={word}>
                        {word}
                        <i>✦</i>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </MotionConfig>
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

