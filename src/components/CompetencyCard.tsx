import { Link } from 'react-router-dom'
import type { Competency } from '../data/competencies'

type CompetencyCardProps = {
  competency: Competency
}

export default function CompetencyCard({ competency }: CompetencyCardProps) {
  return (
    <Link
      to={`/${competency.slug}`}
      className={[
        'group relative flex h-full flex-col rounded-2xl border border-[var(--color-border)]',
        'bg-[var(--color-surface-elevated)]/80 p-6 shadow-lg shadow-black/20 backdrop-blur-sm',
        'outline-none ring-offset-2 ring-offset-[var(--color-surface)] transition duration-300 ease-out',
        'motion-reduce:transition-none',
        'hover:-translate-y-1 hover:border-[var(--color-accent-muted)] hover:shadow-xl hover:shadow-black/25',
        'motion-reduce:hover:translate-y-0',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
      ].join(' ')}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 motion-reduce:transition-none"
        aria-hidden
      />
      <h2 className="relative font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {competency.title}
      </h2>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-slate-400 sm:text-base">
        {competency.shortDescription}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
        Open workspace
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
          →
        </span>
      </span>
    </Link>
  )
}
