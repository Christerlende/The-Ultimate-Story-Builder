import CompetencyCard from '../components/CompetencyCard'
import { competencies } from '../data/competencies'

export default function Home() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          For authors who wants to unlock their potential
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Build Your Masterpiece From the Ground Up
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          Six competencies—one at a time. Build the foundation and write a masterpiece.
        </p>
      </div>

      <section
        aria-labelledby="competencies-heading"
        className="mt-14"
      >
        <h2 id="competencies-heading" className="sr-only">
          Core competencies
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => (
            <li key={c.id} className="min-h-[200px]">
              <CompetencyCard competency={c} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
