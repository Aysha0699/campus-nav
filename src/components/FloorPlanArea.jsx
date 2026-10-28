   import { Check, ExternalLink, Info, MapPinned } from 'lucide-react'
import SampleBadge from './SampleBadge'
import { getCategoryMeta } from '../utils/categoryMeta'

const gridStyle = {
  backgroundImage:
    'linear-gradient(to right, rgba(116, 118, 107, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(116, 118, 107, 0.08) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

   export default function FloorPlanArea({ title, isOutdoor, links = [], items, selectedId, onSelect }) {
  const safeItems = Array.isArray(items) ? items : []
  const hasSample = safeItems.some((item) => item?.isDemo)

  return (
    <section aria-labelledby="plan-heading" className="rounded-2xl border border-line bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
        <h2 id="plan-heading" className="text-lg font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <span className="rounded-full bg-canvas px-3 py-1 text-xs font-semibold text-muted ring-1 ring-line">
          {isOutdoor ? 'Map pending' : 'Floor plan pending'}
        </span>
      </div>

      <div className="p-5">
        <div
          style={gridStyle}
          className="flex min-h-80 items-center justify-center rounded-xl border border-line bg-canvas p-6 sm:min-h-[26rem] lg:min-h-[30rem]"
        >
          <div className="max-w-sm rounded-2xl border border-line bg-white/95 p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-ink">
              <MapPinned className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-3 text-base font-semibold text-ink">
              {isOutdoor ? 'Verified campus map not added yet' : 'Verified floor plan not added yet'}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              The grid behind this card is decorative, not a map. Room positions, routes and
              distances will appear here only after the real layout is supplied.
            </p>
                        {links.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-ink hover:bg-primary/90"
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted">
                  External maps open in a new tab. They are not part of this app’s verified data.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">Rooms and facilities in this view</h3>
          <span className="text-xs text-muted">{safeItems.length} listed</span>
        </div>

        {hasSample && (
          <p className="mt-2 flex items-start gap-2 rounded-lg bg-primary-soft p-3 text-xs text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Items marked Sample are illustrative placeholders, not real rooms. They are listed
            here, not placed on a map.
          </p>
        )}

        {safeItems.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-line p-4 text-sm text-muted">
            Nothing has been added for this view yet.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {safeItems.map((item) => {
              const meta = getCategoryMeta(item?.category)
              const Icon = meta.Icon
              const active = item.id === selectedId

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelect?.(item)}
                    className={`flex min-h-16 w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      active
                        ? 'border-olive bg-olive-soft'
                        : 'border-line bg-white hover:border-grey hover:bg-canvas'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        active ? 'bg-olive text-white' : 'bg-white text-ink ring-1 ring-line'
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="block text-xs text-muted">
                        {item.code ? `${item.code} · ` : ''}
                        {meta.label}
                      </span>
                    </span>
                    {item.isDemo && <SampleBadge />}
                    {active && <Check className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}