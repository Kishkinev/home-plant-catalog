import type { Plant } from './plant'

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

function createPlantCard(plant: Plant): HTMLElement {
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

  card.append(title, room, interval, lastWatered, note, actions)

  return card

  return card
}

export function renderPlants(container: HTMLElement, plants: Plant[]): void {
  const cards = plants.map(createPlantCard)
  container.replaceChildren(...cards)
}

export function showCountOfPlants(container: HTMLElement, count: number): void {
  container.textContent = String(count).padStart(2, '0')
}
