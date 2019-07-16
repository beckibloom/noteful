import React from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import './Sidebar.css';

class MainSidebar extends React.Component {

  static contextType = NotefulContext;

  handleDisplayFolders = () => {
    return (
      this.context.folders.map(folder => 
        <li className='folder' key={folder.id} id={folder.id}>
          <NavLink to={`/folder/${folder.id}`}>
            {folder.name}
          </NavLink>
        </li>))
  }

  render() {
    return (
      <nav className='Sidebar' id='sidebar'>
          <ul>
              {this.handleDisplayFolders()}
          </ul>
          <button className="add-folder">Add Folder</button>
      </nav>
    );
  }
}

export default MainSidebar;