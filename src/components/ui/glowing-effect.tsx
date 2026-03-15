import { cn } from '@/lib/utils'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

/* Palette: #E0ECFB #F3F5F7 #000000 #FFFFFF #3A49DA */

interface GlowingEffectProps {
  proximity?: number
  size?: number
  variant?: 'default' | 'white' | 'portfolio'
  glow?: boolean
  className?: string
  disabled?: boolean
}

const GlowingEffect = memo(
  ({
    proximity = 80,
    size = 280,
    variant = 'portfolio',
    glow: _glow = false,
    className,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
    const rafRef = useRef<number>(0)

    const handleMove = useCallback(
      (e: PointerEvent) => {
        if (!containerRef.current || disabled) return

        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect()
        const inBounds =
          e.clientX >= left - proximity &&
          e.clientX <= left + width + proximity &&
          e.clientY >= top - proximity &&
          e.clientY <= top + height + proximity

        if (!inBounds) {
          setPosition(null)
          return
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        })
      },
      [disabled, proximity]
    )

    useEffect(() => {
      if (disabled) return
      document.body.addEventListener('pointermove', handleMove, { passive: true })
      return () => {
        document.body.removeEventListener('pointermove', handleMove)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, [handleMove, disabled])

    const glowColor =
      variant === 'portfolio'
        ? 'rgba(58, 73, 218, 0.35)'
        : variant === 'white'
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(221, 123, 187, 0.35)'

    return (
      <div
        ref={containerRef}
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
          className,
          disabled && '!hidden'
        )}
      >
        {position && (
          <div
            className="glow-spotlight"
            style={
              {
                '--glow-x': `${position.x}px`,
                '--glow-y': `${position.y}px`,
                '--glow-size': `${size}px`,
                '--glow-color': glowColor,
              } as React.CSSProperties
            }
          />
        )}
      </div>
    )
  }
)

GlowingEffect.displayName = 'GlowingEffect'

export { GlowingEffect }
