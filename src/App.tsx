import { memo, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Copy, FileText, FolderGit2 } from 'lucide-react'
import './App.css'
import avatar from '@/assets/avatar.jpg'
import githubIcon from '@/assets/social/github.png'
import instagramIcon from '@/assets/social/instagram.png'
import linkedinIcon from '@/assets/social/linkedin.png'
import xIcon from '@/assets/social/x.png'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { SystemOrbit } from '@/components/ui/system-orbit'
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar'

type ProjectTag = 'Product' | 'Web' | 'Backend' | 'Full-stack'

type Project = {
  title: string
  tag: ProjectTag
  year?: string
  description: string
  stack: string[]
  live: string
  repo: string
}

type ResumeTab = 'Experience' | 'Skills' | 'Education' | 'Achievements'

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
  degree: string
  school: string
  period: string
  location?: string
  note: string
}

type Achievement = {
  title: string
  issuer: string
  meta: string[]
  note?: string
}

type Social = {
  name: string
  handle: string
  url: string
  icon: string
}

const navSections: (LiquidNavItem & { id: string })[] = [
  { id: 'home', label: 'Home', href: '#home', icon: NimbusIcons.home, fx: 'glow' },
  { id: 'projects', label: 'Projects', href: '#projects', icon: <FolderGit2 size={18} strokeWidth={1.8} />, fx: 'spin' },
  { id: 'resume', label: 'Resume', href: '#resume', icon: <FileText size={18} strokeWidth={1.8} />, fx: 'drop' },
  { id: 'connect', label: 'Connect', href: '#connect', icon: NimbusIcons.plane, fx: 'plane' },
]

const projects: Project[] = [
  {
    title: 'Sphere',
    tag: 'Backend',
    year: '2026',
    description:
      'A 4-service professional networking platform. Redis write bucketing and an async Kafka notification pipeline cut API response times by ~50–70%, with ELK and Zipkin for logging and distributed tracing.',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'OpenFeign', 'Kafka', 'Redis', 'Resilience4j', 'ELK', 'Zipkin', 'Docker', 'Kubernetes'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Sphere',
  },
  {
    title: 'Click N Go',
    tag: 'Full-stack',
    description:
      'A local services booking platform with the complete search-to-confirmation flow, REST APIs for bookings and authentication, and a reusable service-category architecture.',
    stack: ['React', 'Node.js', 'Express', 'REST APIs'],
    live: 'https://click-n-go-frontend-skd2.vercel.app/',
    repo: 'https://github.com/HEYDEV001/ClickNGo-Complete',
  },
  {
    title: 'Staylio',
    tag: 'Backend',
    year: '2025',
    description:
      'A property booking backend powering end-to-end reservation flows, with JWT authentication, role-based host and guest access, and Stripe checkout with webhook processing.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Stripe', 'Docker'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Staylio-Backend',
  },
  {
    title: 'ECom',
    tag: 'Backend',
    year: '2026',
    description:
      'Scalable e-commerce backend managing product catalogs, order workflows, inventory updates, and secure user authentication through high-performance APIs.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Kafka', 'Redis', 'Microservices', 'WebSocket'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/Ecommerce',
  },
  {
    title: 'Krishi-setu',
    tag: 'Backend',
    year: '2025',
    description:
      'AI-powered backend service for agricultural assistance that processes farmer queries, integrates ML APIs, and manages data through scalable microservices.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
    live: '#',
    repo: 'https://github.com/HEYDEV001/SIH-KrishiSetu',
  },
]

const experience: Experience[] = [
  {
    company: 'Meyvex Media Private Ltd.',
    role: 'Full-Stack Developer',
    location: 'On-site',
    period: 'Aug 2026 — Present',
    summary: 'Building production websites end-to-end, working directly with clients from requirements to launch.',
    highlights: [
      'Built and delivered 3 client websites end-to-end, translating client requirements into production-ready builds.',
      'Independently designed and built Meyvex Media’s own company website from the ground up.',
    ],
  },
  {
    company: 'TheAyurherb',
    role: 'Full-Stack Intern',
    location: 'Remote',
    period: 'Jul 2025 — Oct 2025',
    summary: 'Shipped backend features and improved API performance in a production Node.js/Express service.',
    highlights: [
      'Reduced API response time by 15% on the search endpoint by profiling query execution and optimizing backend logic.',
      'Cut post-release defect reports by testing API endpoints and UI flows against edge cases before every deployment.',
      'Partnered with backend and frontend engineers to scope, troubleshoot, and ship shared features on time.',
    ],
  },
  {
    company: 'GDG (Google Developers Group)',
    role: 'Web Development Lead',
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
    title: 'Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'Python'],
  },
  {
    title: 'Frameworks',
    items: ['Spring Boot', 'Spring Security', 'React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'JUnit 5', 'Mockito'],
  },
  {
    title: 'Systems & Integration',
    items: [
      'Microservices',
      'System Design',
      'Spring Cloud',
      'OpenFeign',
      'REST APIs',
      'Apache Kafka',
      'ELK Stack',
      'Zipkin',
      'Micrometer',
      'Rate Limiting',
    ],
  },
  {
    title: 'Databases',
    items: ['SQL', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Neo4j'],
  },
  {
    title: 'DevOps & Tools',
    items: ['Docker', 'Kubernetes', 'GitHub Actions (CI/CD)', 'Git & GitHub'],
  },
  {
    title: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOP', 'Computer Networks', 'Operating Systems', 'DBMS'],
  },
]

const education: Education[] = [
  {
    degree: 'M.Tech (Integrated) – Artificial Intelligence & Data Science',
    school: 'Devi Ahilya Vishwavidyalaya (DAVV), Indore',
    period: 'Aug 2023 – Present',
    note: 'Specializing in Artificial Intelligence and Data Science. Focused on scalable systems, machine learning, and software engineering.',
  },
  {
    degree: 'Higher Secondary Examination',
    school: 'Maharishi Vidya Mandir',
    period: '2023',
    location: 'Chhatarpur, India',
    note: 'Scored 84.6%',
  },
  {
    degree: 'Secondary School (Class X)',
    school: 'Takshashila Public Model High School, Nowgong, Chhatarpur, Madhya Pradesh',
    period: 'Apr 2020 – Mar 2021',
    note: 'Scored 87.8%',
  },
]

const achievements: Achievement[] = [
  {
    title: 'Semifinalist, Software Development Track',
    issuer: 'Flipkart GRiD 8.0',
    meta: ['Top ~1%', 'National'],
    note:
      'Cleared profile screening and a proctored DSA coding assessment to place among the top ~1,500 of 165,730+ national registrants.',
  },
  {
    title: 'Spring Boot Developer Cohort 3.0',
    issuer: 'Coding Shuttle',
    meta: ['Certification'],
  },
]

const socials: Social[] = [
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/dev-pathak',
    url: 'https://www.linkedin.com/in/dev-pathak-17b067296/',
    icon: linkedinIcon,
  },
  {
    name: 'GitHub',
    handle: 'github.com/HEYDEV001',
    url: 'https://github.com/HEYDEV001',
    icon: githubIcon,
  },
  {
    name: 'X (Twitter)',
    handle: 'x.com/HEYDEV001',
    url: 'https://x.com/HEYDEV001',
    icon: xIcon,
  },
  {
    name: 'Instagram',
    handle: 'instagram.com/devvvvvvv.p',
    url: 'https://www.instagram.com/devvvvvvv.p/',
    icon: instagramIcon,
  },
]

const heroMetrics = [
  { value: 70, suffix: '%', label: 'Faster APIs with Redis + Kafka' },
  { value: 1, prefix: 'Top ', suffix: '%', label: 'Flipkart GRiD 8.0, of 165k+' },
  { value: 8.42, decimals: 2, suffix: '', label: 'CGPA, M.Tech AI & DS' },
]

const marqueeWords = [
  'Backend engineering',
  'Distributed systems',
  'Microservices',
  'System design',
  'Observability',
  'Spring Boot',
  'Kafka',
  'Kubernetes',
]

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease },
})

const projectFilters: ('All' | ProjectTag)[] = ['All', ...new Set(projects.map((project) => project.tag))]

const projectCounts = Object.fromEntries(
  projectFilters.map((tag) => [
    tag,
    tag === 'All' ? projects.length : projects.filter((project) => project.tag === tag).length,
  ])
) as Record<'All' | ProjectTag, number>

const resumeTabs: ResumeTab[] = ['Experience', 'Skills', 'Education', 'Achievements']

const resumeCounts: Record<ResumeTab, number> = {
  Experience: experience.length,
  Skills: skillGroups.length,
  Education: education.length,
  Achievements: achievements.length,
}

const rowReveal = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay: 0.05 * i, ease },
})

type RevealTitleProps = {
  text: string
  as?: 'h1' | 'h2'
  className?: string
}

// Words wrapped in *asterisks* render as italic accents
function RevealTitle({ text, as = 'h2', className = '' }: RevealTitleProps) {
  const Heading = as === 'h1' ? motion.h1 : motion.h2

  return (
    // The heading triggers the reveal: masked words start clipped, so they can't observe themselves
    <Heading
      className={`display-title ${className}`}
      aria-label={text.replaceAll('*', '')}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {text.split(' ').map((word, i) => {
        const accent = word.startsWith('*') && word.includes('*', 1)
        const [, inner = word, trail = ''] = accent ? word.match(/^\*(.+)\*(.*)$/) ?? [] : []
        return (
          <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
            <motion.span
              variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
              transition={{ duration: 0.7, ease }}
            >
              {accent ? (
                <>
                  <em>{inner}</em>
                  {trail}
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        )
      })}
    </Heading>
  )
}

type CountUpProps = {
  value: number
  suffix: string
  prefix?: string
  decimals?: number
}

function CountUp({ value, suffix, prefix, decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.2,
      delay: reduceMotion ? 0 : 0.3,
      ease,
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, value, decimals, reduceMotion])

  return (
    <p className="metric-value">
      {prefix && <span className="metric-prefix">{prefix}</span>}
      <span ref={ref}>{(0).toFixed(decimals)}</span>
      <span className="metric-suffix">{suffix}</span>
    </p>
  )
}

const ProjectRow = memo(function ProjectRow({ project, index }: { project: Project; index: number }) {
  // Feeds the cursor position to the CSS spotlight behind the row
  const trackCursor = (event: MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.li
      layout
      className="project-row"
      onMouseMove={trackCursor}
      {...rowReveal(index)}
      exit={{ opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2 } }}
    >
      <Hairline delay={0.05 * index} />
      <div className="project-row-inner">
        <span className="row-index">{String(index + 1).padStart(2, '0')}</span>

        <div className="project-heading">
          <h3 className="project-title">
            <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">
              {/* The slide lives on this span: a transform on the link or title would shrink its row-wide hit area */}
              <span className="project-title-text">{project.title}</span>
            </a>
          </h3>
          <span className="project-tag">{project.tag}</span>
        </div>

        <div className="project-info">
          <p>{project.description}</p>
          <ul className="project-stack">
            {project.stack.map((item, j) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.04 * index + 0.02 * j + 0.1, ease }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="project-side">
          {project.year && <span className="project-year">{project.year}</span>}
          {project.live !== '#' && (
            <a className="project-live connect-link" href={project.live} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          <span className="project-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </motion.li>
  )
})

function Hairline({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={`hairline ${className}`}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease }}
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
  text?: string
  points?: string[]
}

const TimelineRow = memo(function TimelineRow({ index, meta, title, sub, text, points }: TimelineRowProps) {
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
        transition={{ type: 'spring', bounce: 0.4, duration: 0.6, delay: 0.1 }}
      />
      <div className="row-main">
        <p className="row-sub">
          <span className="row-index">{String(index + 1).padStart(2, '0')}</span>
          {sub}
        </p>
        <h3 className="row-title">{title}</h3>
        {text && <p className="row-text">{text}</p>}
        {points && (
          <ul className="row-points">
            {points.map((item, j) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + 0.04 * j, ease }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
})

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

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 })
  return <motion.span className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function Brand({ onSelect }: { onSelect: () => void }) {
  const [showTime, setShowTime] = useState(false)

  // Alternate the subtitle between the role and the local time
  useEffect(() => {
    const id = window.setInterval(() => setShowTime((v) => !v), 4000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <a className="brand" href="#home" onClick={onSelect} aria-label="Dev Pathak, back to top">
      <span className="brand-mark" aria-hidden="true">
        <img src={avatar} alt="" width={40} height={40} decoding="async" />
      </span>
      <span className="brand-text" aria-hidden="true">
        <span className="brand-title">
          <span className="text-roll" data-text="Dev Pathak">
            Dev Pathak
          </span>
        </span>
        <span className="brand-sub">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={showTime ? 'time' : 'role'}
              className="brand-sub-line"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              {showTime ? (
                <>
                  <span className="status-dot" />
                  Indore · <LocalTime />
                </>
              ) : (
                'Backend + Full-Stack Developer'
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </a>
  )
}

function SiteHeader({ active, onNavChange }: { active: number; onNavChange: (index: number) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <MotionConfig reducedMotion="user">
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <ScrollProgress />
        <motion.div
          className="nav-brand"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Brand onSelect={() => onNavChange(0)} />
        </motion.div>
        {/* Plain wrapper: an opacity or transform here would cut the navbar's backdrop refraction */}
        <div className="nav-links">
          <LiquidNavbar
            tone="light"
            items={navSections}
            active={active}
            onChange={onNavChange}
            style={{ fontFamily: 'var(--body)' }}
          />
        </div>
        <motion.div
          className="nav-cta"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        >
          <LiquidMetalButton
            label="Start a project"
            onClick={() => window.location.assign('#connect')}
          />
        </motion.div>
      </header>
    </MotionConfig>
  )
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
            if (scrollTarget.current && scrollTarget.current !== id) return
            scrollTarget.current = null
            setActiveSection(id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <AuroraBackground className="fixed inset-0 -z-10 h-auto [contain:strict]" aria-hidden="true" />
      <SiteHeader
        active={Math.max(0, navSections.findIndex((section) => section.id === activeSection))}
        onNavChange={handleNavChange}
      />

      <main>
        <section id="home" className="hero" data-section>
          <MotionConfig reducedMotion="user">
            <div className="hero-copy">
              <motion.p className="eyebrow hero-eyebrow" {...fadeUp(0)}>
                <span className="section-index">01</span>
                Engineering scalable backend systems
              </motion.p>
              <RevealTitle
                as="h1"
                className="hero-title"
                text="I design and build *scalable* backend systems that power *reliable* digital products."
              />
              <motion.p className="lede" {...fadeUp(0.3)}>
                Full-stack developer at Meyvex Media and M.Tech (Integrated) AI &amp; DS student, building distributed
                backend systems and microservices with Java, Spring Boot, Kafka, Redis, Docker and Kubernetes.
              </motion.p>
              <motion.div className="hero-actions" {...fadeUp(0.35)}>
                <LiquidMetalButton label="Explore my work" onClick={() => window.location.assign('#projects')} />
                <LiquidMetalButton label="View resume" onClick={() => window.location.assign('#resume')} />
              </motion.div>
              <div className="hero-metrics">
                {heroMetrics.map((metric, i) => (
                  <motion.div key={metric.label} className="metric" {...fadeUp(0.4 + 0.05 * i)}>
                    <Hairline delay={0.4 + 0.06 * i} />
                    <CountUp
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                    <p className="metric-label">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
            >
              <SystemOrbit />
              <p className="hero-visual-hint">Hover the stack</p>
            </motion.div>
          </MotionConfig>
        </section>

        <section id="projects" className="projects" data-section>
          <MotionConfig reducedMotion="user">
            <div className="section-top">
              <motion.p className="eyebrow" {...fadeUp(0)}>
                <span className="section-index">02</span>
                Projects
              </motion.p>
              <Hairline className="section-top-line" delay={0.15} />
              <motion.a
                className="connect-link"
                href="https://github.com/HEYDEV001"
                target="_blank"
                rel="noreferrer"
                {...fadeUp(0.125)}
              >
                All work on GitHub
              </motion.a>
            </div>

            <div className="section-intro">
              <RevealTitle text="Selected work." />
              <motion.p className="panel-lede" {...fadeUp(0.175)}>
                Scalable backend systems built for real-world workloads, from APIs to event-driven microservices.
              </motion.p>
            </div>

            <motion.div className="text-tabs" role="tablist" aria-label="Filter projects" {...fadeUp(0.225)}>
              {projectFilters.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  role="tab"
                  aria-selected={filter === tag}
                  className={filter === tag ? 'active' : ''}
                  onClick={() => setFilter(tag)}
                >
                  <span className="tab-label">{tag}</span>
                  <sup className="tab-count">{String(projectCounts[tag]).padStart(2, '0')}</sup>
                  {filter === tag && (
                    <motion.span
                      layoutId="project-filter-line"
                      className="tab-line"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            <ol className="project-list">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, i) => (
                  <ProjectRow key={project.title} project={project} index={i} />
                ))}
              </AnimatePresence>
            </ol>
          </MotionConfig>
        </section>

        <section id="resume" className="resume" data-section>
          <MotionConfig reducedMotion="user">
            <div className="section-top">
              <motion.p className="eyebrow" {...fadeUp(0)}>
                <span className="section-index">03</span>
                Resume
              </motion.p>
              <Hairline className="section-top-line" delay={0.15} />
              <motion.div {...fadeUp(0.125)}>
                <a className="cta-pill cta-pill--small" href="/dev_pathak_resume.pdf" download>
                  Download PDF
                  <span className="cta-icon cta-icon--down">
                    <ArrowDown size={16} />
                    <ArrowDown size={16} />
                  </span>
                </a>
              </motion.div>
            </div>

            <div className="section-intro">
              <RevealTitle text="Experience, skills & education." />
              <motion.p className="panel-lede" {...fadeUp(0.175)}>
                Building distributed backend systems with a focus on system design, observability, and code that holds up.
              </motion.p>
            </div>

            <motion.div className="text-tabs" role="tablist" aria-label="Resume sections" {...fadeUp(0.225)}>
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
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease }}
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
                          <Hairline delay={0.05 * i} />
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
                                transition={{ duration: 0.45, delay: 0.04 * i + 0.02 * j + 0.1, ease }}
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
                          meta={entry.location ? [entry.period, entry.location] : [entry.period]}
                          title={entry.degree}
                          sub={entry.school}
                          text={entry.note}
                        />
                      ))}
                    </Timeline>
                  )}

                  {resumeTab === 'Achievements' && (
                    <Timeline>
                      {achievements.map((item, i) => (
                        <TimelineRow
                          key={item.title}
                          index={i}
                          meta={item.meta}
                          title={item.title}
                          sub={item.issuer}
                          text={item.note}
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

              <motion.p className="panel-lede" {...fadeUp(0.175)}>
                Open to backend engineering, distributed systems, and scalable infrastructure projects.
              </motion.p>

              <motion.button type="button" className="email-line" onClick={handleCopy} {...fadeUp(0.225)}>
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

              <motion.div className="connect-actions" {...fadeUp(0.275)}>
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
                <motion.dl className="connect-meta" {...fadeUp(0.05)}>
                  <div>
                    <dt>Based in</dt>
                    <dd>Indore, India</dd>
                  </div>
                  <div>
                    <dt>Works</dt>
                    <dd>On-site &amp; remote</dd>
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
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.05 * i, ease }}
                    >
                      <a className="social-row" href={social.url} target="_blank" rel="noreferrer">
                        <span
                          className="social-icon"
                          aria-hidden="true"
                          style={{ '--icon': `url(${social.icon})` } as CSSProperties}
                        />
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

