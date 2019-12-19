import React from 'react';
import NotefulContext from './NotefulContext';
import './Sidebar.css';

class NoteSidebar extends React.Component {

  static contextType = NotefulContext;

  getFolderObject = (notes, folders) => {
    const currentNote = notes.find(note =>
      note.id === parseInt(this.props.match.params.noteId))

    const folderObj = currentNote !== undefined ?  folders.find(folder =>
      folder.id === currentNote.folder) : {id:0,name:''};
    return folderObj!==undefined ? folderObj: {id:0,name:''} ;
  }

  render() {
    const folderObj = this.getFolderObject(this.context.notes, this.context.folders);
    return (
        <nav className='Sidebar' id='sidebar'>
            <button 
              className="go-back"
              onClick={() => this.props.history.goBack()}>
            Go Back
            </button>
            <h2>Folder: {folderObj.folder_name}</h2>
        </nav>
    );
  }
}

export default NoteSidebar;