import {
  School,
  FlaskConical,
  Briefcase,
  DoorOpen,
  GraduationCap,
  Dumbbell,
  Utensils,
  BedDouble,
  Building2,
  MapPin,
} from 'lucide-react'

// One place that decides the label and icon for each category.
const categories = {
  classroom: { label: 'Classroom', Icon: School },
  laboratory: { label: 'Laboratory', Icon: FlaskConical },
  office: { label: 'Office', Icon: Briefcase },
  other: { label: 'Other room', Icon: DoorOpen },
  department: { label: 'Department', Icon: GraduationCap },
  sports: { label: 'Sports', Icon: Dumbbell },
  food: { label: 'Food', Icon: Utensils },
  hostel: { label: 'Hostel', Icon: BedDouble },
  building: { label: 'Building', Icon: Building2 },
}

export function getCategoryMeta(category) {
  return categories[category] ?? { label: category, Icon: MapPin }
}