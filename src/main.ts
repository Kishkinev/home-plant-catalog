import './style.css'
import { validationPlant } from './validation'
import { formatLocalCalendarDate } from './dates'
import {
  readPlantForm,
  showFormErrors,
  clearFormErrors,
  focusFirstInvalidField,
} from './plants-form'

const form = document.querySelector('#plant-form')

if (!(form instanceof HTMLFormElement)) {
  throw new Error('Форма растения не найдена')
}

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
  console.log(plant)
})

form.addEventListener('reset', () => {
  clearFormErrors()
})
