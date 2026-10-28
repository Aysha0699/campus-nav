import { Compass, ExternalLink } from 'lucide-react'
import { college } from '../data/college'

export default function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-ink">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold leading-tight tracking-tight text-ink">
              Campus Navigator
            </h1>
            <p className="text-xs leading-snug text-muted">
              {college.name} · {college.location}
            </p>
          </div>
        </div>

        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-soft hover:bg-primary-soft hover:text-ink sm:inline-flex"
        >
          College website
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}