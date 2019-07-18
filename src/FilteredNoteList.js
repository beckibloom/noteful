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

class FilteredNoteList extends React.Component {

  render() {
    return (
      <NotefulContext.Consumer>

      {(context) => (
        <>
        <button 
          className="clear-filter"
          onClick={() => this.props.history.push('/')}>
          Clear Filter
          </button>
        <ul>
          {context.notes.filter(note => 
          note.folderId === this.props.match.params.folderId)
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
        </>
      )}

      </NotefulContext.Consumer>
    );
  }
}

export default FilteredNoteList