import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="group inline-flex items-baseline gap-2 rounded-md outline-none ring-offset-2 ring-offset-[var(--color-surface)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
              The Ultimate Story Builder
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-wider text-slate-500 sm:inline">
              Beta
            </span>
          </Link>
          <nav aria-label="Site">
            <Link
              to="/"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-slate-500">
        Framework inspired by story-structure craft guides—copy and prompts here are original to this app.
      </footer>
    </div>
  )
}
