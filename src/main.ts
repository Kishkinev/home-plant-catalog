import './style.css'
import type { Plant } from './plant'
import { validationPlant } from './validation'
import { formatLocalCalendarDate } from './dates'

const form = document.querySelector('#plant-form')

if (!(form instanceof HTMLFormElement)) {
  throw new Error('Форма растения не найдена')
}

function showFieldError(fieldID: string, message: string | undefined): void {
  const field = document.getElementById(fieldID)
  const errorElement = document.getElementById(`${fieldID}-error`)

  if (
    !(
      field instanceof HTMLInputElement || field instanceof HTMLSelectElement
    ) ||
    !(errorElement instanceof HTMLParagraphElement)
  ) {
    throw new Error(`Не найдены элементы поля ${fieldID}`)
  }

  errorElement.textContent = message ?? ''
  errorElement.hidden = message === undefined

  if (message === undefined) {
    field.removeAttribute('aria-invalid')
  } else {
    field.setAttribute('aria-invalid', 'true')
  }
}

function clearFormErrors(): void {
  showFieldError('plant-name', undefined)
  showFieldError('plant-room', undefined)
  showFieldError('plant-interval', undefined)
  showFieldError('plant-last-watered', undefined)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(form)

  const plant: Plant = {
    id: crypto.randomUUID(),
    name: String(data.get('name') ?? '').trim(),
    room: String(data.get('room') ?? ''),
    wateringIntervalDays: Number(data.get('wateringIntervalDays')),
    lastWateredOn: String(data.get('lastWateredOn') ?? ''),
    note: String(data.get('note') ?? '').trim(),
  }

  const today = formatLocalCalendarDate(new Date())
  const errors = validationPlant(plant, today)

  showFieldError('plant-name', errors.name)
  showFieldError('plant-room', errors.room)
  showFieldError('plant-interval', errors.wateringIntervalDays)
  showFieldError('plant-last-watered', errors.lastWateredOn)

  if (Object.keys(errors).length > 0) {
    const firstInvalidField = form.querySelector('[aria-invalid="true"]')
    if (firstInvalidField instanceof HTMLElement) {
      firstInvalidField.focus()
    }
    return
  }
})

form.addEventListener('reset', () => {
  clearFormErrors()
})
