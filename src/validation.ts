import type { Plant } from './plant'
import { parseCalendarDay } from './dates'

export type PlantErrors = {
  name?: string
  room?: string
  wateringIntervalDays?: string
  lastWateredOn?: string
}

export function validationPlant(plant: Plant, today: string): PlantErrors {
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

  const todayDay = parseCalendarDay(today)
  const lastWateredDay = parseCalendarDay(plant.lastWateredOn)

  if (todayDay === null) {
    throw new Error('Некорректная сегодняшняя дата')
  }
  if (lastWateredDay === null) {
    errors.lastWateredOn = 'Укажите корректную дату последнего полива'
  } else if (lastWateredDay > todayDay) {
    errors.lastWateredOn = 'Дата последнего полива не может быть в будущем.'
  }

  return errors
}
