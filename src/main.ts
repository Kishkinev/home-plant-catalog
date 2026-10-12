import './style.css'
import type { Plant } from './plant'
import { validationPlant } from './validation'
import { formatLocalCalendarDate } from './dates'
import {
  readPlantForm,
  showFormErrors,
  clearFormErrors,
  focusFirstInvalidField,
} from './plants-form'
import { renderPlants, showCountOfPlants } from './plants-view'

const plants: Plant[] = []

const form = document.querySelector('#plant-form')

if (!(form instanceof HTMLFormElement)) {
  throw new Error('Форма растения не найдена')
}

const plantList = document.querySelector('#plants-list')

if (!(plantList instanceof HTMLElement)) {
  throw new Error('Контейнер коллекции не найден')
}

const plantCount = document.querySelector('.hero__count')

if (!(plantCount instanceof HTMLElement)) {
  throw new Error('Счётчик растений не найден')
}

const today = formatLocalCalendarDate(new Date())

renderPlants(plantList, plants, today)
showCountOfPlants(plantCount, plants.length)

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const plant = readPlantForm(form)
  const today = formatLocalCalendarDate(new Date())
  const errors = validationPlant(plant, today)

  showFormErrors(errors)

  if (Object.keys(errors).length > 0) {
    focusFirstInvalidField(form)
    return
  }
  plants.push(plant)
  renderPlants(plantList, plants, today)
  showCountOfPlants(plantCount, plants.length)
  form.reset()
})

form.addEventListener('reset', () => {
  clearFormErrors()
})
