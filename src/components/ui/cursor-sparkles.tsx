import { useEffect, useState } from 'react'

export function CursorSparkles() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
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
        <div
            style={{
              position: 'fixed',
              left: pos.x,
              top: pos.y,
              width: 120,
              height: 120,
              transform: 'translate(-50%, -50%) scale(1)',
              animation: 'waterFloat 3s ease-in-out infinite',
              borderRadius: '50%',
              pointerEvents: 'none',

              // Glass + water effect
              backdropFilter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
              WebkitBackdropFilter: 'brightness(1.1) contrast(1.1) saturate(1.2)',

              // Soft inner highlight (top light reflection)
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 40%, transparent 60%)',

              // Outer glow + depth
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: `
                inset 0 10px 20px rgba(255,255,255,0.2),
                inset 0 -10px 20px rgba(0,0,0,0.2),
                0 10px 30px rgba(0,0,0,0.25)
              `,

              // Slight motion smoothing
              transition: 'transform 0.08s ease-out',
            }}
        />
        <style>
        {`
        @keyframes waterFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
        `}
        </style>
      </div>
  )
}
