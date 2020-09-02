import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('input#note-title')
const bodyElement = document.querySelector('textarea#note-body')
const removeBtn = document.querySelector('button#remove-note-btn')  
const updatedTimestamp = document.querySelector('p#updated-time')

const noteId = location.hash.substring(1)

initializeEditPage(noteId)

// set note title
titleElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value
  })
  updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
})
// set note body
bodyElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value
  })
  updatedTimestamp.textContent = generateLastEdited(note.updatedAt)
})

// remove note
removeBtn.addEventListener('click', () => {
  removeNote(noteId)
  location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initializeEditPage(noteId)
  }
})