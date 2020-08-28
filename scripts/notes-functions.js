'use strict'

// read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  // if data is invalid in local storage, return an empty array, otherwise parse the data
  try {
    // if notesJSON does not result to false, parse the notes data. Otherwise, return an empty array
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// save notes to localStorage
const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// remove note
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)
  
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
  }
}

const getTimestamp = () => moment().valueOf()

const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

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

const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byLastEdited') {
    return notes.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  } else if (sortBy === 'byLastCreated') {
    return notes.sort((a, b) => {
      return b.createdAt - a.createdAt
    })
  } else if (sortBy === 'sortABC') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return notes
  }
}
  
// render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy)
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  const notesDiv = document.querySelector('div#notes')

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