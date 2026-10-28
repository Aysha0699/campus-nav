import { Building2, Trees } from 'lucide-react'

export default function BuildingSelector({ buildings, floors, selectedId, onChange }) {
  return (
    <div role="group" aria-label="Choose a building or area">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Building</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {buildings.map((b) => {
          const active = b.id === selectedId
          const Icon = b.type === 'outdoor' ? Trees : Building2
          const count = floors.filter((f) => f.buildingId === b.id).length

          return (
            <button
              key={b.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(b.id)}
              className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${
                active
                  ? 'border-primary bg-primary-soft text-ink shadow-sm'
                  : 'border-line bg-white text-ink hover:border-grey hover:bg-canvas'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  active ? 'bg-primary text-ink' : 'bg-canvas text-grey'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{b.name}</span>
                <span className="block text-xs text-ink-soft">
                  {count > 0 ? `${count} floor${count === 1 ? '' : 's'}` : 'Outdoor area'}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}