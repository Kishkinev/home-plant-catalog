import './style.css'
import type { Plant } from './plant'

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
    note: String(data.get('note')).trim(),
  }

  console.log(plant)
})
