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
    n.id === parseInt(props.match.params.noteId))
  return note !== undefined ? note : {id:0,note_name:'', modified:'', note_content:''};
}

class Note extends React.Component {
  render() {
    return (
    <NotefulContext.Consumer>

    {(context) => (
      <section className='NoteList'>
        <ul>
          <li key={getNoteObj(context, this.props).id} className='note'>
            <Link to={`/note/${getNoteObj(context, this.props).id}`}>
              <h2>{getNoteObj(context, this.props).note_name}</h2>
            </Link>
              <p className="date-modified">Date modified: {getNoteObj(context, this.props).modified}</p>
              <button 
                  className="delete"
                  onClick={() => {
                    deleteNoteRequest(
                      getNoteObj(context, this.props).id,
                      context.deleteNote,
                      this.props
                    )}
                  }>
                  Delete Note
                </button>
          </li>
          <p className='note-content'>{getNoteObj(context, this.props).note_content}</p>
        </ul>
      </section>
    )}

    </NotefulContext.Consumer>
    )
  }
}

export default Note