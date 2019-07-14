import React from 'react';
import { Link } from 'react-router-dom';
import NOTES from './dummy-store.js';
import './NoteList.css';

class NoteList extends React.Component {
  renderNotes = () => {
    // if (this.props.match.params.folderId) {
    //   return (
    //     NOTES.notes.find(note =>
    //       note.folderId === this.props.match.params.folderId
    //     )
    //   )
    // } else {
      return NOTES.notes
    // }
  }
  render() {
    const notesToRender = this.renderNotes();
    return (
      <section className='NoteList' id='notelist'>
          <ul>
            {notesToRender.map(note =>
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