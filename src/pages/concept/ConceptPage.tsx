import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'usb.concept.idea'

/** Matches `text-base` / `leading-[1.45rem]` and `py-3` (1.5rem total vertical padding). */
const LINE_HEIGHT_REM = 1.45
const MIN_VISIBLE_LINES = 3
const MAX_HEIGHT_REM = 22
const MAX_HEIGHT_VH = 0.35

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

function syncIdeaTextareaHeight(el: HTMLTextAreaElement | null) {
  if (!el) return

  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const minH = MIN_VISIBLE_LINES * LINE_HEIGHT_REM * rem + 1.5 * rem
  const maxH = Math.min(MAX_HEIGHT_REM * rem, window.innerHeight * MAX_HEIGHT_VH)

  el.style.height = 'auto'
  const contentH = el.scrollHeight
  const next = Math.min(Math.max(contentH, minH), maxH)
  el.style.height = `${next}px`
  el.style.overflowY = contentH > maxH ? 'auto' : 'hidden'
}

export default function ConceptPage() {
  const [idea, setIdea] = useState(readStoredIdea)
  const [ideaLocked, setIdeaLocked] = useState(false)
  const [ideaExplainerOpen, setIdeaExplainerOpen] = useState(false)
  const ideaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    writeStoredIdea(idea)
  }, [idea])

  useLayoutEffect(() => {
    syncIdeaTextareaHeight(ideaRef.current)
  }, [idea, ideaLocked, ideaExplainerOpen])

  useEffect(() => {
    const onResize = () => syncIdeaTextareaHeight(ideaRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleIdeaDoneOrEdit = () => {
    if (ideaLocked) {
      setIdeaLocked(false)
      queueMicrotask(() => ideaRef.current?.focus())
    } else {
      setIdeaLocked(true)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="concept-desk flex min-h-0 flex-1 justify-center overflow-hidden rounded-2xl sm:px-2 sm:py-3">
        <div
          className="concept-sheet flex min-h-0 w-full max-w-2xl flex-col overflow-y-auto overflow-x-hidden rounded-lg border border-[rgb(44_40_37/0.12)] bg-[#f7f0e4] px-5 py-6 text-[#3d3530] shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)] sm:rotate-[0.35deg] sm:px-8 sm:py-8"
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

          <div className="mt-5 flex shrink-0 flex-col gap-3 sm:mt-6">
            <label
              htmlFor="concept-idea"
              className="font-scribble shrink-0 text-xl font-semibold text-[#3d3530] sm:text-2xl"
            >
              What&apos;s your idea?
            </label>
            <textarea
              ref={ideaRef}
              id="concept-idea"
              value={idea}
              readOnly={ideaLocked}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="A dancer in the streets of Paris. A legendary knight with a magical sword. A pilot during World War II. A detective solving a mystery."
              className={`concept-scribble-field min-h-[calc(3*1.45rem+1.5rem)] w-full resize-none rounded-md border border-[rgb(44_40_37/0.18)] py-3 pl-10 pr-4 text-base leading-[1.45rem] text-[#3d3530] shadow-inner outline-none transition-[box-shadow,background-color,color] placeholder:text-[#78716c]/65 focus:border-[rgb(194_65_12/0.45)] focus:ring-2 focus:ring-[rgb(194_65_12/0.25)] ${
                ideaLocked
                  ? 'cursor-default bg-[#ede6d8] text-[#2c2824] focus:ring-[rgb(44_40_37/0.15)]'
                  : 'bg-[#faf6ee]'
              }`}
              autoComplete="off"
              spellCheck={!ideaLocked}
            />
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleIdeaDoneOrEdit}
                aria-label={ideaLocked ? 'Edit your idea' : 'Mark idea as done'}
                className={`font-scribble rounded-lg border px-4 py-2 text-lg font-semibold shadow-sm outline-none transition-[background-color,box-shadow,border-color,color,transform] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f0e4] active:scale-[0.98] motion-reduce:active:scale-100 ${
                  ideaLocked
                    ? 'border-[rgb(74_124_90/0.4)] bg-[#bcd8c4] text-[#24392e] hover:bg-[#aecdb8] focus-visible:ring-[rgb(74_124_90/0.45)]'
                    : 'border-[rgb(120_116_110/0.5)] bg-[#e3e2df] text-[#4a4744] hover:bg-[#d8d6d2] focus-visible:ring-[rgb(113_113_122/0.45)]'
                }`}
              >
                {ideaLocked ? 'Edit' : 'Done'}
              </button>
            </div>
            <div className="mt-1">
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <p className="font-scribble text-lg font-semibold text-[#3d3530]">
                  What&apos;s an idea?
                </p>
                <button
                  type="button"
                  onClick={() => setIdeaExplainerOpen((open) => !open)}
                  aria-expanded={ideaExplainerOpen}
                  aria-controls="concept-idea-explainer"
                  aria-label={
                    ideaExplainerOpen
                      ? 'Hide what counts as an idea'
                      : 'Learn what counts as an idea'
                  }
                  className="group font-scribble flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgb(44_40_37/0.2)] bg-[#faf6ee] shadow-sm outline-none transition-[background-color,color,transform] hover:border-[rgb(44_40_37/0.28)] hover:bg-[#f3ece0] focus-visible:ring-2 focus-visible:ring-[#9a3412]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f0e4] active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <span
                    aria-hidden
                    className="text-[1.125rem] font-bold leading-none tracking-tight text-[#57534e] group-hover:text-[#3d3530]"
                  >
                    i
                  </span>
                </button>
              </div>
              <div
                id="concept-idea-explainer"
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  ideaExplainerOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0">
                  <div className="space-y-2 pt-3 text-sm leading-relaxed text-[#534741]/95 sm:text-[0.95rem]">
                    <p>
                      An idea is the initial spark of interest behind a story, before conflict, stakes,
                      character pursuit, or dramatic framing have been added. An idea does not
                      automatically imply a story, and can be as simple as &apos;a football match,&apos;{' '}
                      &apos;a soldier in a war,&apos; &apos;a hungry lion,&apos; and &apos;the 2017 break-dance crew of
                      Australia.&apos; It can be longer too, but don&apos;t add any dramatic tension yet. A
                      longer example: a bus driver who is mistaken as millionaire and tries to live that
                      life. An idea can also be thematic, such as &apos;I want to write a story about
                      environmental issues, or poverty.&apos;
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
