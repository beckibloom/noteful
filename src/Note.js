import React from 'react';
import './Note.css';

class Note extends React.Component {
  render() {
    return (
      <li id='note'>
          <h2>Note 1</h2>
          <p className="date-modified">Date modified on 3rd Jan 2019</p>
          <button className="delete">Delete Note</button>
      </li>
    );
  }
}

export default Note;