import type { Plant } from './plant'

export type PlantErrors = {
  name?: string
  room?: string
  wateringIntervalDays?: string
}

export function validationPlant(plant: Plant): PlantErrors {
  const errors: PlantErrors = {}

  if (plant.name.trim() === '') errors.name = 'Введите название растения'

  const interval = plant.wateringIntervalDays

  if (!Number.isInteger(interval) || interval < 1 || interval > 90)
    errors.wateringIntervalDays = 'Введите целое число от 1 до 90'

  const rooms = [
    'Гостиная',
    'Спальня',
    'Кухня',
    'Кабинет',
    'Прихожая',
    'Ванная',
    'Балкон',
    'Другое',
  ]

  if (!rooms.includes(plant.room)) errors.room = 'Выберите комнату из списка'

  return errors
}
