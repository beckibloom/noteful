import React from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

class FilteredNoteList extends React.Component {

  render() {
    const filteredNotes = this.props.filteredNotes;
    return (
      <section className='NoteList' id='notelist'>
          <ul>
            {filteredNotes.map(note =>
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

export default FilteredNoteList;