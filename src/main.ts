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
import {
  renderPlants,
  showCountOfPlants,
  renderCarePlants,
} from './plants-view'
import { getPlantsNeedingWater, waterPlant } from './watering'

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

const careContainer = document.getElementById('care-list')

if (!(careContainer instanceof HTMLElement)) {
  throw new Error('Контейнер ухода не найден')
}

const today = formatLocalCalendarDate(new Date())

const renderApp = (today: string): void => {
  const careList = getPlantsNeedingWater(plants, today)

  renderPlants(plantList, plants, today)
  renderCarePlants(careContainer, careList, today)
  showCountOfPlants(plantCount, plants.length)
}

renderApp(today)

function handlePlantClick(event: MouseEvent): void {
  const currentPlant = event.target
  if (!(currentPlant instanceof Element)) {
    return
  }
  const currentButton = currentPlant.closest('button[data-action]')
  if (!(currentButton instanceof HTMLButtonElement)) {
    return
  }
  if (currentButton.dataset.action !== 'water') {
    return
  }
  const currentArticle = currentButton.closest('article[data-id]')
  if (!(currentArticle instanceof HTMLElement)) {
    return
  }
  const currentID = currentArticle.dataset.id
  if (!currentID) {
    return
  }
  const currentIndex = plants.findIndex((p) => p.id === currentID)
  if (currentIndex === -1) {
    return
  }
  const today = formatLocalCalendarDate(new Date())

  plants[currentIndex] = waterPlant(plants[currentIndex], today)

  renderApp(today)
}

plantList.addEventListener('click', handlePlantClick)

careContainer.addEventListener('click', handlePlantClick)

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

  renderApp(today)

  form.reset()
})

form.addEventListener('reset', () => {
  clearFormErrors()
})
