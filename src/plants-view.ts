import type { Plant } from './plant'
import { getDaysUntilWatering, getWateringStatus } from './watering'

function createCardButton(
  label: string,
  action: string,
  modifier: string,
): HTMLButtonElement {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `button button--${modifier}`
  button.textContent = label
  button.dataset.action = action

  return button
}

function createWateringHint(
  remainingWateringDays: number | null,
): HTMLParagraphElement {
  const hint = document.createElement('p')
  hint.className = 'plant-card__status'

  const status = getWateringStatus(remainingWateringDays)
  if (status === null || remainingWateringDays === null) {
    hint.textContent = 'Не удалось рассчитать полив'
    return hint
  }
  hint.classList.add(`plant-card__status--${status}`)
  if (status === 'today') {
    hint.textContent = `Полить сегодня`
  }
  if (status === 'upcoming') {
    hint.textContent = `Полить через ${remainingWateringDays} дн.`
  }
  if (status === 'overdue') {
    hint.textContent = `Полив просрочен на ${Math.abs(remainingWateringDays)} дн.`
  }
  return hint
}

function createCardActions(): HTMLDivElement {
  const actions = document.createElement('div')
  actions.className = 'plant-card__actions'

  actions.append(
    createCardButton('Полито сегодня', 'water', 'primary'),
    createCardButton('Редактировать', 'edit', 'edit'),
    createCardButton('Удалить', 'delete', 'delete'),
  )

  return actions
}

function createPlantCard(plant: Plant, today: string): HTMLElement {
  const card = document.createElement('article')
  card.className = 'plant-card'
  card.dataset.id = plant.id

  const title = document.createElement('h3')
  title.className = 'plant-card__title'
  title.textContent = plant.name

  const room = document.createElement('p')
  room.className = 'plant-card__room'
  room.textContent = plant.room

  const interval = document.createElement('p')
  interval.className = 'plant-card__interval'
  interval.textContent = `Интервал полива: ${plant.wateringIntervalDays} дн.`

  const lastWatered = document.createElement('p')
  lastWatered.className = 'plant-card__last-watering-date'

  const date = document.createElement('time')
  date.dateTime = plant.lastWateredOn
  date.textContent = plant.lastWateredOn
  lastWatered.append('Последний полив: ', date)

  const note = document.createElement('p')
  note.className = 'plant-card__note'
  note.textContent = plant.note
  note.hidden = plant.note === ''

  const actions = createCardActions()
  const remainingWateringDays = getDaysUntilWatering(plant, today)
  const hint = createWateringHint(remainingWateringDays)

  card.append(title, hint, room, interval, lastWatered, note, actions)

  return card
}

export function renderPlants(
  container: HTMLElement,
  plants: Plant[],
  today: string,
): void {
  const cards = plants.map((p) => createPlantCard(p, today))
  container.replaceChildren(...cards)
}

export function showCountOfPlants(container: HTMLElement, count: number): void {
  container.textContent = String(count).padStart(2, '0')
}

function createCareCard(plant: Plant, today: string): HTMLElement {
  const card = document.createElement('article')

  const remainingWateringDays = getDaysUntilWatering(plant, today)
  const status = getWateringStatus(remainingWateringDays)

  card.className = 'plant-card'
  card.classList.add(`plant-card--care-${status}`)
  card.dataset.id = plant.id

  const title = document.createElement('h3')
  title.className = 'plant-card__title'
  title.innerText = plant.name

  const hint = createWateringHint(remainingWateringDays)
  const button = createCardButton('Полито сегодня', 'water', 'primary')

  card.append(title, hint, button)

  return card
}

export function renderCarePlants(
  container: HTMLElement,
  plants: Plant[],
  today: string,
): void {
  if (plants.length === 0) {
    const p = document.createElement('p')
    p.innerText = 'Сейчас нет растений, требующих полива'
    container.replaceChildren(p)
    return
  }
  const cards = plants.map((p) => createCareCard(p, today))
  container.replaceChildren(...cards)
}
