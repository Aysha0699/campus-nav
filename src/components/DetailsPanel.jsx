import { ExternalLink, MapPin, X } from 'lucide-react'
import SampleBadge from './SampleBadge'
import { getCategoryMeta } from '../utils/categoryMeta'

const kindLabels = { room: 'Room', department: 'Department', facility: 'Facility', building: 'Building' }

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  )
}

export default function DetailsPanel({ selected, onClear }) {
  if (!selected) {
    return (
      <aside
        aria-label="Destination details"
        className="rounded-2xl border border-line bg-white p-6 shadow-sm lg:sticky lg:top-4"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-canvas text-muted">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-3 text-base font-semibold text-ink">Select a destination</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Search above, or choose a room or facility from the list, to see its details here.
        </p>
      </aside>
    )
  }

  const meta = getCategoryMeta(selected.category)
  const Icon = meta.Icon
  const location = selected.buildingName
    ? selected.floor
      ? `${selected.buildingName}, Floor ${selected.floor}`
      : selected.buildingName
    : null

  return (
    <aside
      aria-label="Destination details"
      aria-live="polite"
      className="rounded-2xl border border-line bg-white p-6 shadow-sm lg:sticky lg:top-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-olive-soft text-olive">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-ink">
            {selected.title}
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-medium text-muted">{meta.label}</span>
            {selected.isDemo && <SampleBadge />}
          </div>
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear selection"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-canvas hover:text-ink"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-canvas p-4 ring-1 ring-line">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Recorded location
        </p>
        <p className="mt-1 text-sm font-semibold text-ink">{location ?? 'Not confirmed yet'}</p>
        {!location && (
          <p className="mt-1 text-xs text-ink-soft">
            This location has not been added to the campus data yet.
          </p>
        )}
      </div>

      <dl className="mt-3">
        <Row label="Type" value={kindLabels[selected.kind] ?? selected.kind} />
        {selected.code && (
          <Row
            label={selected.kind === 'department' ? 'Short name' : 'Room number'}
            value={selected.code}
          />
        )}
        {selected.kind !== 'department' && selected.kind !== 'building' && (
          <Row label="Category" value={meta.label} />
        )}
        <Row label="Building" value={selected.buildingName ?? 'Not confirmed yet'} />
        {selected.kind === 'room' && <Row label="Floor" value={selected.floor} />}
        <Row label="Map position" value={selected.coordinates ? 'Recorded' : 'Not recorded yet'} />
      </dl>

      {selected.notes && <p className="mt-3 text-sm text-ink-soft">{selected.notes}</p>}

      {selected.links?.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {selected.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-ink hover:bg-primary/90"
            >
              {link.label}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </aside>
  )
}
