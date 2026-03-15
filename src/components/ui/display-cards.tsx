import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DisplayCardProps {
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
  href?: string
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-[var(--surface)]" />,
  title = 'Featured',
  description = 'Discover amazing content',
  date = 'Just now',
  iconClassName = 'text-[var(--surface)]',
  titleClassName = 'text-[var(--text-strong)]',
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-52 w-[30rem] -skew-y-[5deg] select-none flex-col justify-between rounded-[28px] border-2 border-[rgba(0,0,0,0.08)] bg-[var(--surface)]/95 px-7 py-6 text-[var(--text-strong)] shadow-[0_24px_56px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:-right-3 after:top-[-5%] after:h-[110%] after:w-[22rem] after:rounded-[28px] after:bg-gradient-to-l after:from-[rgba(243,245,247,0.98)] after:to-transparent after:content-[\"\"] hover:-translate-y-4 hover:border-[rgba(58,73,218,0.4)] hover:shadow-[0_36px_80px_rgba(58,73,218,0.18)]',
        '[&>*]:flex [&>*]:items-center [&>*]:gap-4',
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-2xl bg-[var(--accent)]/90 p-2.5 shadow-[0_12px_36px_rgba(58,73,218,0.35)]">
          <span className={cn('text-[var(--surface)]', iconClassName)}>{icon}</span>
        </span>
        <p className={cn('text-xl font-semibold tracking-tight', titleClassName)}>
          {title}
        </p>
      </div>
      <p className="text-base leading-relaxed opacity-90">
        {description}
      </p>
      <p className="text-sm text-[var(--text-muted)]/90">{date}</p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        '[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:border before:border-[rgba(0,0,0,0.1)] before:bg-[var(--bg)]/55 before:content-[\"\"] before:transition-opacity before:duration-700 grayscale hover:before:opacity-0 hover:grayscale-0',
    },
    {
      className:
        '[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:border before:border-[rgba(0,0,0,0.1)] before:bg-[var(--bg)]/55 before:content-[\"\"] before:transition-opacity before:duration-700 grayscale hover:before:opacity-0 hover:grayscale-0',
    },
    {
      className:
        '[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10',
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="min-h-[480px] grid place-items-center [grid-template-areas:'stack'] opacity-100 animate-in fade-in-0 duration-1000 ease-out">
      {displayCards.map((cardProps, index) => {
        const { href, ...rest } = cardProps
        const card = <DisplayCard key={index} {...rest} />

        if (!href) return card

        const isExternal = href.startsWith('http')

        return (
          <a
            key={index}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            className="[grid-area:stack] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
          >
            {card}
          </a>
        )
      })}
    </div>
  )
}

export type { DisplayCardProps, DisplayCardsProps }
export { DisplayCards }

