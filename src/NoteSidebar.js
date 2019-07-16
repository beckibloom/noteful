import React from 'react';
import NotefulContext from './NotefulContext';
import './Sidebar.css';

class NoteSidebar extends React.Component {

  static contextType = NotefulContext;

  getFolderObject = () => {
    const currentNote = this.context.notes.find(note =>
      note.id === this.props.match.params.noteId)
    const folderObj = this.context.folders.find(folder =>
      folder.id === currentNote.folderId);
    return folderObj;
  }

  render() {
    const folderObj = this.getFolderObject();
    return (
        <nav className='Sidebar' id='sidebar'>
            <button 
              className="go-back"
              onClick={() => this.props.history.goBack()}>
            Go Back
            </button>
            <h2>Folder: {folderObj.name}</h2>
        </nav>
    );
  }
}

export default NoteSidebar;