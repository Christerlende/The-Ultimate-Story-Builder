import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'usb.concept.idea'

function readStoredIdea(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

function writeStoredIdea(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* quota or private mode */
  }
}

export default function ConceptPage() {
  const [idea, setIdea] = useState(readStoredIdea)

  useEffect(() => {
    writeStoredIdea(idea)
  }, [idea])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="concept-desk flex min-h-0 flex-1 justify-center overflow-hidden rounded-2xl sm:px-2 sm:py-3">
        <div
          className="concept-sheet flex min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-[rgb(44_40_37/0.12)] bg-[#f7f0e4] px-5 py-6 text-[#3d3530] shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)] sm:rotate-[0.35deg] sm:px-8 sm:py-8"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <Link
            to="/"
            className="mb-4 inline-flex w-fit shrink-0 items-center gap-2 rounded text-sm font-medium text-[#534741]/80 outline-none transition-colors hover:text-[#3d3530] focus-visible:ring-2 focus-visible:ring-[#9a3412]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f0e4]"
          >
            <span aria-hidden>←</span>
            Back to competencies
          </Link>

          <div className="min-h-0 shrink-0 border-b border-[rgb(44_40_37/0.12)] pb-5">
            <p className="font-scribble text-[1.35rem] font-semibold leading-snug text-[#3d3530] sm:text-2xl">
              Let&apos;s start with your idea, and let&apos;s make it into a fantastic concept.
            </p>
            <ScribbleUnderline className="text-[#c2410c]/70" />
            <p className="mt-4 text-base leading-relaxed text-[#534741] sm:text-[1.05rem]">
              This concept needs to pass certain tests, and that&apos;s what we&apos;re here to do.
              Start by noting down your idea below.
            </p>
          </div>

          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden sm:mt-6">
            <label
              htmlFor="concept-idea"
              className="font-scribble shrink-0 text-xl font-semibold text-[#3d3530] sm:text-2xl"
            >
              What&apos;s your idea?
            </label>
            <textarea
              id="concept-idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Jot anything here—messy is fine. That's what drafts are for."
              rows={6}
              className="concept-scribble-field flex min-h-[10rem] flex-1 resize-none rounded-md border border-[rgb(44_40_37/0.18)] bg-[#faf6ee] py-3 pl-10 pr-4 text-base leading-[1.45rem] text-[#3d3530] shadow-inner outline-none transition-[box-shadow] placeholder:text-[#78716c]/65 focus:border-[rgb(194_65_12/0.45)] focus:ring-2 focus:ring-[rgb(194_65_12/0.25)] sm:min-h-0 sm:max-h-[min(22rem,35vh)]"
              autoComplete="off"
              spellCheck
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg
      className={`mt-2 h-3 w-[min(100%,14rem)] shrink-0 ${className ?? ''}`}
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 8c28-5 52-5 78 0 24 4 48 4 74-2 24-5 46-3 64 2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
