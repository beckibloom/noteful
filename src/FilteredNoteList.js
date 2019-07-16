import React from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';
import NotefulContext from './NotefulContext';

function deleteNoteRequest(noteId, cb) {
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
    })
    .catch(error => {
      console.error(error)
    })
}

export default function FilteredNoteList(props) {
  return (
    <NotefulContext.Consumer>

    {(context) => (
      <section className='NoteList' id='notelist'>
          <ul>
            {context.notes.filter(note => 
            note.folderId === props.match.params.folderId)
            .map(note =>
              <li key={note.id} className='note'>
                <Link to={`/note/${note.id}`}>
                  <h2>
                    {note.name}
                  </h2>
                </Link>
                <p className='date-modified'> Date Modified: {note.modified}</p>
                <button 
                className="delete"
                onClick={() => {
                  deleteNoteRequest(
                    note.id,
                    context.deleteNote
                  )
                }}>
                Delete Note
              </button>
              </li>
            )}
          </ul>
          <button className="add-note">Add Note</button>
      </section>
    )}

    </NotefulContext.Consumer>
  );
}