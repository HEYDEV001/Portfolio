import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTime,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils'

type OrbitNodeData = {
  label: string
  role: string
  // Position on the stage, in percent
  x: number
  y: number
  // How strongly the node follows the cursor; nearer nodes move more
  depth: number
}

const nodes: OrbitNodeData[] = [
  { label: 'Spring Boot', role: 'REST APIs & core services', x: 50, y: 12, depth: 1 },
  { label: 'Kafka', role: 'Event streaming between services', x: 84, y: 31, depth: 0.7 },
  { label: 'Redis', role: 'Caching & fast lookups', x: 83, y: 70, depth: 1.2 },
  { label: 'PostgreSQL', role: 'Relational, transactional storage', x: 50, y: 88, depth: 0.8 },
  { label: 'Kubernetes', role: 'Orchestration at scale', x: 16, y: 69, depth: 1.1 },
  { label: 'Docker', role: 'Containerized, repeatable builds', x: 17, y: 30, depth: 0.6 },
]

const requests = [
  { method: 'GET', path: '/api/listings', status: 200, ms: 12 },
  { method: 'POST', path: '/api/bookings', status: 201, ms: 38 },
  { method: 'GET', path: '/api/feed', status: 200, ms: 9 },
  { method: 'PUT', path: '/api/orders/42', status: 200, ms: 21 },
  { method: 'GET', path: '/health', status: 200, ms: 3 },
]

const ease = [0.16, 1, 0.3, 1] as const

// Maximum parallax shift, in percent of the stage
const PARALLAX = 6
const PACKET_SECONDS = 2.8
const CORE_DEPTH = 0.35

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v))

// The same shift as useNodePosition, converted from stage percent to pixels for transforms
function useParallaxOffset(pointer: MotionValue<number>, size: MotionValue<number>, depth: number) {
  return useTransform(() => (pointer.get() * depth * PARALLAX * size.get()) / 100)
}

function useNodePosition(node: OrbitNodeData, sx: MotionValue<number>, sy: MotionValue<number>) {
  const x = useTransform(sx, (v) => node.x + v * node.depth * PARALLAX)
  const y = useTransform(sy, (v) => node.y + v * node.depth * PARALLAX)
  return { x, y }
}

type LinkProps = {
  node: OrbitNodeData
  index: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  cx: MotionValue<number>
  cy: MotionValue<number>
  active: boolean
  animated: boolean
}

function OrbitLink({ node, index, sx, sy, cx, cy, active, animated }: LinkProps) {
  const { x, y } = useNodePosition(node, sx, sy)
  const time = useTime()
  // Alternate direction so some packets flow in to the core and some flow out
  const t = useTransform(time, (ms) => {
    const p = ((ms / 1000 + index * 0.9) % PACKET_SECONDS) / PACKET_SECONDS
    return index % 2 ? 1 - p : p
  })
  const packetX = useTransform(() => x.get() + (cx.get() - x.get()) * t.get())
  const packetY = useTransform(() => y.get() + (cy.get() - y.get()) * t.get())
  const packetOpacity = useTransform(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <g className={cn('orbit-link', active && 'is-active')}>
      <motion.line
        className="orbit-line"
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 + index * 0.06, ease }}
      />
      {animated && (
        <motion.circle className="orbit-packet" r={0.7} cx={packetX} cy={packetY} style={{ opacity: packetOpacity }} />
      )}
    </g>
  )
}

type NodeProps = {
  node: OrbitNodeData
  index: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  size: MotionValue<number>
  active: number | null
  onActive: (index: number | null) => void
}

function OrbitNode({ node, index, sx, sy, size, active, onActive }: NodeProps) {
  const x = useParallaxOffset(sx, size, node.depth)
  const y = useParallaxOffset(sy, size, node.depth)

  return (
    <motion.div
      className={cn('orbit-node', active === index && 'is-active', active !== null && active !== index && 'is-dimmed')}
      style={{ left: `${node.x}%`, top: `${node.y}%`, x, y }}
      onPointerEnter={() => onActive(index)}
      onPointerLeave={() => onActive(null)}
    >
      <motion.div
        style={{ x: '-50%', y: '-50%' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease }}
      >
        <span
          className="orbit-float"
          style={{ '--float-dur': `${5 + (index % 3)}s`, '--float-delay': `${index * -0.8}s` } as CSSProperties}
        >
          <span className="orbit-pill">{node.label}</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

function RequestTicker() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % requests.length), 2400)
    return () => window.clearInterval(id)
  }, [])

  const req = requests[i]

  return (
    <div className="orbit-ticker">
      <span className="status-dot" />
      <span className="orbit-ticker-window">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            className="orbit-ticker-line"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <b>{req.method}</b>
            <span>{req.path}</span>
            <span className="orbit-ticker-status">{req.status}</span>
            <span>{req.ms}ms</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

export function SystemOrbit({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 50, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 50, damping: 18, mass: 0.6 })
  const cx = useTransform(sx, (v) => 50 + v * CORE_DEPTH * PARALLAX)
  const cy = useTransform(sy, (v) => 50 + v * CORE_DEPTH * PARALLAX)
  const size = useMotionValue(0)
  const coreX = useParallaxOffset(sx, size, CORE_DEPTH)
  const coreY = useParallaxOffset(sy, size, CORE_DEPTH)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => size.set(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [size])

  // The whole page drives the parallax, so the system leans toward the cursor wherever it is
  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      const rect = stage.current?.getBoundingClientRect()
      if (!rect) return
      px.set(clamp((event.clientX - (rect.left + rect.width / 2)) / window.innerWidth))
      py.set(clamp((event.clientY - (rect.top + rect.height / 2)) / window.innerHeight))
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py, reduceMotion])

  const activeNode = active === null ? null : nodes[active]

  return (
    <div ref={stage} className={cn('orbit', className)} aria-hidden="true">
      <div className="orbit-glow" />

      <svg className="orbit-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g className="orbit-rings">
          <circle className="orbit-ring" cx="50" cy="50" r="38" />
        </g>
        <g className="orbit-rings orbit-rings--reverse">
          <circle className="orbit-ring orbit-ring--inner" cx="50" cy="50" r="25" />
        </g>
        {nodes.map((node, i) => (
          <OrbitLink
            key={node.label}
            node={node}
            index={i}
            sx={sx}
            sy={sy}
            cx={cx}
            cy={cy}
            active={active === i}
            animated={!reduceMotion}
          />
        ))}
      </svg>

      <motion.div className="orbit-core" style={{ x: coreX, y: coreY }}>
        <motion.div
          className="orbit-core-inner"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeNode?.label ?? 'default'}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease }}
            >
              <p className="orbit-core-label">{activeNode ? activeNode.label : 'Now building'}</p>
              <p className="orbit-core-text">{activeNode ? activeNode.role : 'Distributed backend systems'}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {nodes.map((node, i) => (
        <OrbitNode
          key={node.label}
          node={node}
          index={i}
          sx={sx}
          sy={sy}
          size={size}
          active={active}
          onActive={setActive}
        />
      ))}

      <motion.div
        className="orbit-ticker-wrap"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease }}
      >
        <RequestTicker />
      </motion.div>
    </div>
  )
}
