export default function FloorSelector({ floors, selectedNumber, onChange }) {
  return (
    <div role="group" aria-label="Choose a floor">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Floor</p>

      {floors.length === 0 ? (
        <p className="flex min-h-11 items-center text-sm text-muted">
          Outdoor areas have no floors.
        </p>
      ) : (
        <div className="flex w-full rounded-xl border border-line bg-white p-1 shadow-sm sm:inline-flex sm:w-auto">
          {floors.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.number === selectedNumber}
              onClick={() => onChange(f.number)}
              className={`min-h-11 flex-1 rounded-lg px-5 text-sm font-semibold transition sm:flex-none ${
                f.number === selectedNumber
                  ? 'bg-olive text-white shadow-sm'
                  : 'text-ink-soft hover:bg-olive-soft hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}