import type { Plant } from './plant'
import type { PlantErrors } from './validation'

export function readPlantForm(form: HTMLFormElement): Plant {
  const data = new FormData(form)

  return {
    id: crypto.randomUUID(),
    name: String(data.get('name') ?? '').trim(),
    room: String(data.get('room') ?? ''),
    wateringIntervalDays: Number(data.get('wateringIntervalDays')),
    lastWateredOn: String(data.get('lastWateredOn') ?? ''),
    note: String(data.get('note') ?? '').trim(),
  }
}

export function showFieldError(
  fieldID: string,
  message: string | undefined,
): void {
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

export function showFormErrors(errors: PlantErrors): void {
  showFieldError('plant-name', errors.name)
  showFieldError('plant-room', errors.room)
  showFieldError('plant-interval', errors.wateringIntervalDays)
  showFieldError('plant-last-watered', errors.lastWateredOn)
}

export function focusFirstInvalidField(form: HTMLFormElement): void {
  const field = form.querySelector('[aria-invalid="true"]')
  if (!(field instanceof HTMLElement)) {
    return
  }
  field.focus()
}

export function clearFormErrors(): void {
  showFormErrors({})
}
