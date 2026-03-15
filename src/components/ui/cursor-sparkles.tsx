import { useEffect, useState } from 'react'

type Sparkle = {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    let id = 0
    let frame: number | null = null

    const addSparkle = (e: PointerEvent) => {
      const x = e.clientX
      const y = e.clientY
      const next: Sparkle = {
        id: id++,
        x,
        y,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 120,
      }

      // Use rAF to batch updates
      if (frame != null) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setSparkles((prev) => {
          const withNew = [...prev, next]
          // keep only the latest 32 sparkles
          return withNew.slice(-32)
        })
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      addSparkle(e)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame != null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="cursor-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}

