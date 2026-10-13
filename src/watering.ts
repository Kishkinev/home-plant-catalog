import type { Plant } from './plant'
import { parseCalendarDay } from './dates'

export type WateringStatus = 'today' | 'upcoming' | 'overdue'

export function getDaysUntilWatering(
  plant: Plant,
  today: string,
): number | null {
  const lastWateredDay = parseCalendarDay(plant.lastWateredOn)
  const todayDay = parseCalendarDay(today)

  if (lastWateredDay === null || todayDay === null) return null

  const nextWateringDay = lastWateredDay + plant.wateringIntervalDays

  const remainingWateringDays = nextWateringDay - todayDay

  return remainingWateringDays
}

export function getWateringStatus(
  remainingWateringDays: number | null,
): WateringStatus | null {
  if (remainingWateringDays === null) {
    return null
  }
  if (remainingWateringDays === 0) {
    return 'today'
  }
  if (remainingWateringDays > 0) {
    return 'upcoming'
  }
  return 'overdue'
}

export function getPlantsNeedingWater(plants: Plant[], today: string): Plant[] {
  const plantsNeedingWater = plants.filter((p) => {
    const remainingWateringDays = getDaysUntilWatering(p, today)

    if (remainingWateringDays === null) {
      return false
    }

    return remainingWateringDays <= 0
  })

  plantsNeedingWater.sort((a: Plant, b: Plant) => {
    const firstPlantDays = getDaysUntilWatering(a, today)
    const secondPlantDays = getDaysUntilWatering(b, today)

    if (firstPlantDays === null || secondPlantDays === null) return 0

    return firstPlantDays - secondPlantDays
  })

  return plantsNeedingWater
}
