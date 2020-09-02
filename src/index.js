import { createNote} from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#create-note-btn').addEventListener('click', (e) => {
  const id = createNote()
  location.assign(`./edit.html#${id}`)
})

document.querySelector('input#search').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderNotes()
})

document.querySelector('select#filter-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value
  })
  renderNotes()
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    renderNotes()
  }
})
