import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NotefulContext from './NotefulContext';

function deleteNoteRequest(noteId, cb, props) {
  const notesEndpoint = 'http://localhost:9090/notes';
  fetch(notesEndpoint + `/${noteId}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      cb(noteId)
      props.history.push('/')
    })
    .catch(error => {
      console.error(error)
    })
}

function getNoteObj(context, props) {
  const note = context.notes.find(n =>
    n.id === props.match.params.noteId)
  return note;
}

export default function Note(props) {
  return (
  <NotefulContext.Consumer>

  {(context) => (
    <section className='NoteList'>
      <ul>
        <li key={getNoteObj(context, props).id} className='note'>
          <Link to={`/note/${getNoteObj(context, props).id}`}>
            <h2>{getNoteObj(context, props).name}</h2>
          </Link>
            <p className="date-modified">Date modified: {getNoteObj(context, props).modified}</p>
            <button 
                className="delete"
                onClick={() => {
                  deleteNoteRequest(
                    getNoteObj(context, props).id,
                    context.deleteNote,
                    props
                  )}
                }>
                Delete Note
              </button>
        </li>
        <p className='note-content'>{getNoteObj(context, props).content}</p>
      </ul>
    </section>
  )}

  </NotefulContext.Consumer>
  )
}
