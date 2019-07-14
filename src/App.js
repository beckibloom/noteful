import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.js';
import Note from './Note.js';
import NOTES from './dummy-store.js';
import MainSidebar from './MainSidebar.js';
import NoteSidebar from './NoteSidebar.js';
import MainNoteList from './MainNoteList.js';
import FilteredNoteList from './FilteredNoteList.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = NOTES
  }
  getFolderObject = (routerProps) => {
    const currentNote = this.state.notes.find(note =>
      note.id === routerProps.match.params.noteId)
    const folderObj = this.state.folders.find(folder =>
      folder.id === currentNote.folderId);
    return folderObj;
  }
  render() {
    return (
      <main className='App'>
        <Header />
        <div className='page-content'>
          <section>
            <Route exact path='/' component={MainSidebar} />
            <Route path='/folder/:folderId' component={MainSidebar} />
            <Route 
              path='/note/:noteId' 
              render={(routerProps) =>
                <NoteSidebar
                  folder={this.getFolderObject(routerProps)}
                  routerProps={routerProps}
                />}
              />
          </section>
          <section>
            <Route exact path='/' component={MainNoteList} />
            <Route 
              path='/folder/:folderId' 
              render={(routerProps) => 
                <FilteredNoteList
                  filteredNotes={this.state.notes.filter(note => note.folderId === routerProps.match.params.folderId)}
                />} 
              />
            <Route path='/note/:noteId' component={Note} />
          </section>
        </div>
      </main>
    );
  }
}

export default App;