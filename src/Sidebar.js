import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      displayingNote: false
    }
  }

  handleDisplayFolders = () => {
    return this.props.folders.map(folder => 
      <li className='folder' key={folder.id} id={folder.id}>
        {folder.name}
      </li>)
  }

  handleDisplayNote = () => {
    if (this.state.displayingNote === false) {
      return (
        <section className='Sidebar' id='sidebar'>
          <ul>
              {this.handleDisplayFolders()}
          </ul>
          <button className="add-folder">Add Folder</button>
        </section>
      )
    }
    else {
      return (
        <section className='Sidebar' id='sidebar'>
          <button className="go-back">Go Back</button>
        </section>
      )
    }
  }

  render() {
    return (
      this.handleDisplayNote()
    );
  }
}

export default Sidebar;