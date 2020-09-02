import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

let notes = []

// read existing notes from localStorage
const loadNotes = () => {
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
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// expose notes from module allowing access to other modules
const getNotes = () => notes

// create a note
const createNote = () => {
  let id = uuidv4()
  const getTimestamp = () => moment().valueOf()

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: getTimestamp(),
    updatedAt: getTimestamp()
  })
  saveNotes()
  
  return id
}

// remove note
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)
  
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
    saveNotes()
  }
}

const sortNotes = (sortBy) => {
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

// update notes
const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id)

  if (!note) {
    return
  }

  if (typeof updates.title === 'string') {
    note.title = updates.title
    note.updatedAt = moment().valueOf()
  }

  if (typeof updates.body === 'string') {
    note.body = updates.body
    note.updatedAt = moment().valueOf()
  }

  saveNotes()
  return note
}

// populate notes array
notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }