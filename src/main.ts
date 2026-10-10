import './style.css'
import type { Plant } from './plant'

const examplePlant: Plant = {
  id: 'plant-1',
  name: 'Растение 1',
  room: 'Кухня',
  wateringIntervalDays: 7,
  lastWateredOn: '2026-01-01',
  note: 'Заметка растения',
}

console.log(examplePlant)
