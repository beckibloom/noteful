import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext.js';
import NoteIcon from './images/noteicon.png';
import './NoteList.css';

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

class MainNoteList extends React.Component {
  render() {
    return (
      <NotefulContext.Consumer>
      {(context) => (
        <>
        <Link to={`/addnote`}>
          <button className="add-note">
            <img src={NoteIcon} alt="Note Icon" className='noteicon' /> 
            &nbsp; Add New Note
          </button>
        </Link>
        <ul>
          {context.notes.map(note =>
            <li key={note.id} className='note'>
              <Link to={`/note/${note.id}`}>
                <h2>
                  {note.note_name}
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
        </>
      )}

      </NotefulContext.Consumer>
    );
  }
}

export default MainNoteList