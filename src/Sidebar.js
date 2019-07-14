import React from 'react';
import { NavLink } from 'react-router-dom';
import NOTES from './dummy-store';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      displayingNote: false
    }
  }

  handleDisplayFolders = () => {
    return NOTES.folders.map(folder => 
      <li className='folder' key={folder.id} id={folder.id}>
        <NavLink to={`/folder/${folder.id}`}>
          {folder.name}
        </NavLink>
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