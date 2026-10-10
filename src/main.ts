import './style.css'
import type { Plant } from './plant'
import { validationPlant } from './validation'

const form = document.querySelector('#plant-form')

if (!(form instanceof HTMLFormElement)) {
  throw new Error('Форма растения не найдена')
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

  const errors = validationPlant(plant)

  if (Object.keys(errors).length > 0) {
    console.log(errors)
    return
  }

  console.log(plant)
})
