import { rooms } from '../data/rooms'
import { departments } from '../data/departments'
import { facilities } from '../data/facilities'
import { buildings } from '../data/buildings'

// Finds a building's name from its id. Returns null if there is none.
function getBuildingName(id) {
  const building = buildings.find((b) => b.id === id)
  return building ? building.name : null
}

// Turns buildings, rooms, departments and facilities into one list with the same fields.
export function getAllRecords() {
  const buildingRecords = buildings
    .filter((b) => b.type === 'academic')
    .map((b) => ({
      id: b.id,
      kind: 'building',
      title: b.name,
      code: null,
      category: 'building',
      buildingId: b.id,
      buildingName: b.name,
      floor: null,
      aliases: b.aliases ?? [],
      coordinates: null,
      isDemo: false,
      notes: null,
      links: b.links ?? [],
    }))

  const roomRecords = rooms.map((r) => ({
    id: r.id,
    kind: 'room',
    title: r.name ?? r.roomNumber,
    code: r.roomNumber,
    category: r.category,
    buildingId: r.buildingId,
    buildingName: getBuildingName(r.buildingId),
    floor: r.floor,
    aliases: [],
    coordinates: r.coordinates,
    isDemo: r.isDemo,
  }))

  const departmentRecords = departments.map((d) => ({
    id: d.id,
    kind: 'department',
    title: d.name,
    code: d.shortName,
    category: 'department',
    buildingId: d.buildingId,
    buildingName: getBuildingName(d.buildingId),
    floor: null,
    aliases: d.aliases ?? [],
    coordinates: null,
    isDemo: d.isDemo,
  }))

  const facilityRecords = facilities.map((f) => ({
    id: f.id,
    kind: 'facility',
    title: f.name,
    code: null,
    category: f.category,
    buildingId: f.buildingId,
    buildingName: getBuildingName(f.buildingId),
    floor: null,
    aliases: f.aliases ?? [],
    coordinates: f.coordinates,
    isDemo: f.isDemo,
    notes: f.notes ?? null,
  }))

  return [...buildingRecords, ...roomRecords, ...departmentRecords, ...facilityRecords]
}