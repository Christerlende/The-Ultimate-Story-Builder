import { Link, Navigate, useParams } from 'react-router-dom'
import { getCompetencyBySlug, isValidCompetencySlug } from '../data/competencies'

export default function PlaceholderCompetency() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !isValidCompetencySlug(slug)) {
    return <Navigate to="/" replace />
  }

  const competency = getCompetencyBySlug(slug)!

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
      >
        <span aria-hidden>←</span>
        Back to competencies
      </Link>

      <header className="mt-8 border-b border-[var(--color-border)] pb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          Workspace
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {competency.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{competency.shortDescription}</p>
      </header>

      <div className="py-10">
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 px-6 py-12 text-center">
          <p className="text-base text-slate-300">
            Guided prompts and checklists for this competency are on the way.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            You&apos;ll be able to work step-by-step and save progress here in a future update.
          </p>
        </div>
      </div>
    </div>
  )
}
