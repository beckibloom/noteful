import React from 'react';
import { Link } from 'react-router-dom';
// import Note from './Note.js';
import NOTES from './dummy-store.js';
import './NoteList.css';

class NoteList extends React.Component {

  render() {
    return (
      <section className='NoteList' id='notelist'>
          <ul>
            {NOTES.notes.map(note =>
              <li key={note.id} className='note'>
                <Link to={`/note/${note.id}`}>
                  <h2>
                    {note.name}
                  </h2>
                </Link>
                <p className='date-modified'> Date Modified: {note.modified}</p>
                <button className="delete">Delete Note</button>
              </li>
            )}
          </ul>
          <button className="add-note">Add Note</button>
      </section>
    );
  }
}

export default NoteList;