const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

export function parseCalendarDay(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const date = new Date(`${value}T00:00:00Z`)
  const timestamp = date.getTime()

  if (Number.isNaN(timestamp)) return null
  if (date.toISOString().slice(0, 10) !== value) return null

  return timestamp / MILLISECONDS_PER_DAY
}

export function formatLocalCalendarDate(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDay()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
