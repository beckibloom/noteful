import React from 'react';
import NOTES from './dummy-store.js';
import { Link } from 'react-router-dom';
import './Note.css';

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  handleSelected = () => {
    return (
      this.state.selected === true
        ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sapien at metus varius, eu eleifend eros tincidunt. Vestibulum eget quam vitae urna fringilla varius. Aliquam sed vehicula magna. Etiam facilisis hendrerit ex sed rutrum. Nullam consequat urna eget porta venenatis. Vivamus eget iaculis ante. Vivamus maximus malesuada turpis, ut elementum eros congue sed. Proin non risus felis.'
        : ''
    )
  }

  render() {
    const note = NOTES.notes.find(n =>
      n.id === this.props.match.params.noteId
    )
    return (
      <section className='NoteList'>
        <ul>
          <li key={note.id} className='note'>
            <Link to={`/note/${note.id}`}>
              <h2>{note.name}</h2>
            </Link>
              <p className="date-modified">Date modified: {note.modified}</p>
              <button className="delete">Delete Note</button>
          </li>
          <p className='note-content'>{note.content}</p>
        </ul>
      </section>
    );
  }
}

export default Note;