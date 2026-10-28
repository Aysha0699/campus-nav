import { useRef } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import SampleBadge from './SampleBadge'
import { getCategoryMeta } from '../utils/categoryMeta'

const quickSearches = [
  { label: 'Departments', query: 'department' },
  { label: 'Laboratories', query: 'laboratory' },
  { label: 'Classrooms', query: 'classroom' },
  { label: 'Facilities', query: 'facility' },
]

function describeLocation(record) {
  if (!record.buildingName) return 'Location not confirmed yet'
  return record.floor ? `${record.buildingName} · Floor ${record.floor}` : record.buildingName
}

export default function SearchBar({ query, onQueryChange, results, onSelect }) {
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0

  // Keyboard help inside the search box.
  function handleInputKeyDown(e) {
    if (e.key === 'Escape') {
      onQueryChange('')
    } else if (e.key === 'Enter' && results.length > 0) {
      onSelect(results[0])
    } else if (e.key === 'ArrowDown') {
      const first = resultsRef.current?.querySelector('button')
      if (first) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  // Up/Down arrows move between results.
  function handleResultsKeyDown(e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const buttons = Array.from(resultsRef.current.querySelectorAll('button'))
    const index = buttons.indexOf(document.activeElement)
    if (index === -1) return
    e.preventDefault()
    if (e.key === 'ArrowDown') {
      buttons[Math.min(index + 1, buttons.length - 1)].focus()
    } else if (index === 0) {
      inputRef.current?.focus()
    } else {
      buttons[index - 1].focus()
    }
  }

  return (
    <div role="search">
      <label htmlFor="destination-search" className="sr-only">
        Search rooms, departments, labs and facilities
      </label>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 shadow-sm focus-within:border-ink focus-within:ring-4 focus-within:ring-primary/30">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-ink">
  <Search className="h-5 w-5" aria-hidden="true" />
</span>
        <input
          id="destination-search"
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search rooms, departments, labs, facilities…"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => {
              onQueryChange('')
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-canvas hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Read out by screen readers when the number of results changes. */}
      <p className="sr-only" role="status">
        {hasQuery
          ? results.length === 0
            ? 'No results found'
            : `${results.length} result${results.length === 1 ? '' : 's'} found`
          : ''}
      </p>

      {!hasQuery && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted">Browse:</span>
          {quickSearches.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => onQueryChange(q.query)}
              className="min-h-9 rounded-full border border-line bg-white px-3 text-xs font-semibold text-ink-soft hover:border-primary hover:bg-primary-soft hover:text-ink"
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {hasQuery && (
        <div className="mt-3 rounded-2xl border border-line bg-white p-2 shadow-sm">
          {results.length === 0 ? (
            <div className="flex items-start gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-muted">
                <SearchX className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-ink">No destination found for “{trimmed}”</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Try a room number, a department short name such as CSE, or a facility such as
                  canteen. If you expected it to appear, it may not be in the campus data yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onQueryChange('')
                    inputRef.current?.focus()
                  }}
                  className="mt-3 min-h-10 rounded-lg border border-line px-4 text-sm font-semibold text-ink hover:border-primary hover:bg-primary-soft hover:text-ink"
                >
                  Clear search
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="px-3 py-2 text-xs font-medium text-muted">
                {results.length} result{results.length === 1 ? '' : 's'} for “{trimmed}”
              </p>
              <ul ref={resultsRef} onKeyDown={handleResultsKeyDown}>
                {results.map((r) => {
                  const meta = getCategoryMeta(r.category)
                  const Icon = meta.Icon
                  return (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(r)}
                        className="flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-canvas focus-visible:bg-canvas"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-ink">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink">
                            {r.title}
                            {r.code && <span className="ml-2 font-medium text-muted">{r.code}</span>}
                          </span>
                          <span className="block text-xs text-muted">
                            {meta.label} · {describeLocation(r)}
                          </span>
                        </span>
                        {r.isDemo && <SampleBadge />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}