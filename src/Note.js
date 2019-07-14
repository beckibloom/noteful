import React from 'react';
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
    return (
      <>
        <li id='note'>
            <h2>Note 1</h2>
            <p className="date-modified">Date modified on 3rd Jan 2019</p>
            <button className="delete">Delete Note</button>
        </li>
        <p className='note-content'>{this.handleSelected()}</p>
      </>
    );
  }
}

export default Note;