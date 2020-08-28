'use strict'

// get id of selected note
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
// return note whose id matches the noteId (id in hash value)
let note = notes.find((note) => note.id === noteId)

const titleElement = document.querySelector('input#note-title')
const bodyElement = document.querySelector('textarea#note-body')
const removeBtn = document.querySelector('button#remove-note-btn')
const createdTimestamp = document.querySelector('span#created-time')
const updatedTimestamp = document.querySelector('p#updated-time')

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

// set note title
titleElement.addEventListener('input', (e) => {
  note.title = e.target.value
  note.updatedAt = getTimestamp()
  updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
  saveNotes(notes)
})
// set note body
bodyElement.addEventListener('input', (e) => {
  note.body = e.target.value
  note.updatedAt = getTimestamp()
  updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
  saveNotes(notes)
})

// remove note
removeBtn.addEventListener('click', () => {
  removeNote(note.id)
  saveNotes(notes)
  location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    note = notes.find((note) => note.id === noteId)
    
    if (!note) {
      location.assign('./index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    createdTimestamp.textContent = `Created at: ${moment(note.createdAt).format('MMM Do, YYYY')}`
    updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
  }
})