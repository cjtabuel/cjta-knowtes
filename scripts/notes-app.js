'use strict'

let notes = getSavedNotes()

const filters = {
  searchText: '',
  sortBy: 'byLastEdited'
}

renderNotes(notes, filters)

document.querySelector('input#search').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#create-note-btn').addEventListener('click', (e) => {
  let id = uuidv4()

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: getTimestamp(),
    updatedAt: getTimestamp()
  })
  saveNotes(notes)
  // renderNotes(notes, filters)
  location.assign(`./edit.html#${id}`)
})

document.querySelector('select#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)
  }
})