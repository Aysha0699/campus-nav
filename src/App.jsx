import { useRef, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import BuildingSelector from './components/BuildingSelector'
import FloorSelector from './components/FloorSelector'
import FloorPlanArea from './components/FloorPlanArea'
import DetailsPanel from './components/DetailsPanel'
import Footer from './components/Footer'
import { buildings } from './data/buildings'
import { floors } from './data/floors'
import { getAllRecords } from './utils/records'
import { searchRecords } from './utils/search'

const allRecords = getAllRecords()

function getFloorsFor(buildingId) {
  return floors.filter((f) => f.buildingId === buildingId)
}

export default function App() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [buildingId, setBuildingId] = useState('main-block')
  const [floor, setFloor] = useState(1)
  const detailsRef = useRef(null)

  const building = buildings.find((b) => b.id === buildingId)
  const buildingFloors = getFloorsFor(buildingId)
  const isOutdoor = buildingFloors.length === 0
  const results = searchRecords(allRecords, query)

  // Records listed under the floor-plan area.
  // Departments are left out because their locations are not confirmed.
  const visibleItems = allRecords.filter(
    (r) =>
      r.kind !== 'department' && r.kind !== 'building' &&
      r.buildingId === buildingId &&
      (isOutdoor || r.floor === floor)
  )

  const planTitle = isOutdoor ? building.name : `${building.name} · Floor ${floor}`

  function handleBuildingChange(id) {
    setBuildingId(id)
    const firstFloor = getFloorsFor(id)[0]
    setFloor(firstFloor ? firstFloor.number : null)
    setSelected(null)
  }

  function handleFloorChange(number) {
    setFloor(number)
    setSelected(null)
  }

  function handleSelect(record) {
    setSelected(record)
    setQuery('')

    if (record.buildingId) {
      setBuildingId(record.buildingId)
      const firstFloor = getFloorsFor(record.buildingId)[0]
      setFloor(record.floor ?? (firstFloor ? firstFloor.number : null))
    }

    // On phones and tablets the details panel sits below the map, so scroll to it.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <section aria-labelledby="search-heading" className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-olive">
            Campus wayfinding
          </p>
          <h2
            id="search-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Where would you like to go?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft sm:text-base">
            Search departments, classrooms, laboratories and facilities across the campus.
          </p>
          <div className="mt-6 max-w-3xl">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              results={results}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:flex-1">
            <BuildingSelector
              buildings={buildings}
              floors={floors}
              selectedId={buildingId}
              onChange={handleBuildingChange}
            />
          </div>
          <FloorSelector
            floors={buildingFloors}
            selectedNumber={floor}
            onChange={handleFloorChange}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <FloorPlanArea
            title={planTitle}
            isOutdoor={isOutdoor}
            links={building.links ?? []}
            items={visibleItems}
            selectedId={selected?.id}
            onSelect={handleSelect}
          />
          <div ref={detailsRef} className="scroll-mt-4">
            <DetailsPanel selected={selected} onClear={() => setSelected(null)} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}