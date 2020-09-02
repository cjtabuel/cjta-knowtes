import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// generate the dom structure for a note
const generateNoteDom = (note) => {
  const noteEl = document.createElement('a')
  const textEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed Note'
  }
  textEl.classList.add('list-item__title')
  noteEl.appendChild(textEl)

  // setup link
  noteEl.setAttribute('href', `./edit.html#${note.id}`)
  noteEl.classList.add('list-item')

  //setup status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  return noteEl
}

// render application notes
const renderNotes = () => {
  const notesDiv = document.querySelector('div#notes')
  const filters = getFilters()
  const notes = sortNotes(filters.sortBy)
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

  notesDiv.innerHTML = ''

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      notesDiv.appendChild(generateNoteDom(note))
    })
  } else {

    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No notes to display. Add a note to get started'
    emptyMessage.classList.add('empty-message')
    notesDiv.appendChild(emptyMessage)
  }
}

// initialize/render note to create or update
const initializeEditPage = (noteId) => {
  const titleElement = document.querySelector('input#note-title')
  const bodyElement = document.querySelector('textarea#note-body')
  const createdTimestamp = document.querySelector('span#created-time')
  const updatedTimestamp = document.querySelector('p#updated-time')

  const notes = getNotes()
  // return note whose id matches the noteId (id in hash value)
  const note = notes.find((note) => note.id === noteId)
  // validate note
  if (!note) {
    location.assign('./index.html')
  }
  
  // get note title
  titleElement.value = note.title
  // get note body
  bodyElement.value = note.body
  // get created timestamp
  createdTimestamp.textContent = `Created at: ${moment(note.createdAt).format('MMM Do, YYYY')}`
  // get updated timestamp
  updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
}

// generate last edited timestamp
const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

export { generateNoteDom, renderNotes, generateLastEdited, initializeEditPage }