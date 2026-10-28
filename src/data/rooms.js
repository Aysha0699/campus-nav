// Every room below is DEMONSTRATION data (isDemo: true).
// Delete these and add your verified rooms using the same shape.
//
// What each field means:
//   id            a fixed unique label that never changes
//   roomNumber    the room number as text, or null if the room has none
//   name          the room's name, or null if it only has a number
//   buildingId    must match an id in buildings.js ('main-block' or 'eee-block')
//   floor         1, 2 or 3
//   category      'classroom', 'laboratory', 'office' or 'other'
//   departmentId  an id from departments.js (like 'dept-cse'), or null if unknown
//   coordinates   null for now; later it will hold the position on the floor plan
//   isDemo        true = fake record, false = verified real record
export const rooms = [
  { id: 'demo-main-1', roomNumber: 'DEMO-101', name: 'Demo Classroom', buildingId: 'main-block', floor: 1, category: 'classroom', departmentId: null, coordinates: null, isDemo: true },
  { id: 'demo-main-2', roomNumber: 'DEMO-201', name: 'Demo Classroom', buildingId: 'main-block', floor: 2, category: 'classroom', departmentId: null, coordinates: null, isDemo: true },
  { id: 'demo-main-lab', roomNumber: null, name: 'Demo Laboratory', buildingId: 'main-block', floor: 2, category: 'laboratory', departmentId: null, coordinates: null, isDemo: true },
  { id: 'demo-main-3', roomNumber: 'DEMO-301', name: 'Demo Classroom', buildingId: 'main-block', floor: 3, category: 'classroom', departmentId: null, coordinates: null, isDemo: true },
  { id: 'demo-eee-1', roomNumber: 'DEMO-E101', name: 'Demo Classroom', buildingId: 'eee-block', floor: 1, category: 'classroom', departmentId: null, coordinates: null, isDemo: true },
  { id: 'demo-eee-lab', roomNumber: 'DEMO-E301', name: 'Demo EEE Laboratory', buildingId: 'eee-block', floor: 3, category: 'laboratory', departmentId: null, coordinates: null, isDemo: true },
]