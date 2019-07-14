import React from 'react';
import Note from './Note.js';
import './NoteList.css';

class NoteList extends React.Component {
  render() {
    return (
      <section className='NoteList' id='notelist'>
          <ul>
              <Note />
              <Note />
              <Note />
          </ul>
          <button className="add-note">Add Note</button>
      </section>
    );
  }
}

export default NoteList;