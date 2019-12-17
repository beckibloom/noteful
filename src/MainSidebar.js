import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import FolderIcon from './images/foldericon.png';
import './Sidebar.css';

class MainSidebar extends React.Component {

  static contextType = NotefulContext;

  handleDisplayFolders = () => {
    return (
      this.context.folders.map(folder => 
        <li className='folder' key={folder.id} id={folder.id}>
          <NavLink to={`/folder/${folder.id}`}>
            {folder.folder_name}
          </NavLink>
        </li>))
  }

  handleDisplayButtons = () => {
    return (
      <div className="Add__buttons">
        <Link to={`/addfolder`}>
          <button className="add-folder">
            <img src={FolderIcon} alt="Folder Icon" className='foldericon' /> 
            &nbsp; Add New Folder
          </button>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <nav>
        <h3>Folders</h3>
          <ul>
              {this.handleDisplayFolders()}
          </ul>
        {this.handleDisplayButtons()}
      </nav>
    );
  }
}

export default MainSidebar;