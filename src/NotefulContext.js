import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  onAddFolder: () => {},
  onAddNote: () => {},
})

export default NotefulContext