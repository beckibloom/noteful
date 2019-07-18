import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import Header from './Header.js';
import Note from './Note.js';
import MainSidebar from './MainSidebar.js';
import NoteSidebar from './NoteSidebar.js';
import MainNoteList from './MainNoteList.js';
import FilteredNoteList from './FilteredNoteList.js';
import NotefulContext from './NotefulContext.js';
import AddFolder from './AddFolder.js';
import AddNote from './AddNote.js';
import SidebarError from './SidebarError.js';
import NoteListError from './NoteListError.js';
import AddFormError from './AddFormError.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null
    }
  }

  setFolders = folders => {
    this.setState({
      folders
    })
  }

  setNotes = notes => {
    this.setState({
      notes
    })
  }

  onAddFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    })
  }

  onAddNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note],
    })
  }

  deleteNote = noteId => {
    console.log('The deleteNote prop ran in App.js')
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    fetch(config.folders_endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))

    fetch(config.notes_endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }))
  }
  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      onAddFolder: this.onAddFolder,
      onAddNote: this.onAddNote,
    }
    return (
      <NotefulContext.Provider value={contextValue}>

      <main className='App'>
        <Header />
        <AddFormError>
          <Route
            path='/addfolder'
            component={AddFolder}
          />
          <Route
            path='/addnote'
            component={AddNote}
          />
        </AddFormError>
          <div className='page-content'>
            <section className='Sidebar' id='sidebar'>
              <SidebarError>
                <Route exact path='/' component={MainSidebar} />
                <Route path='/folder/:folderId' component={MainSidebar} />
                <Route 
                  path='/note/:noteId' 
                  component={NoteSidebar}
                  />
                </SidebarError>
            </section>
            <section className='NoteList' id='notelist'>
              <NoteListError>
                <Route exact path='/' component={MainNoteList} />
                <Route 
                  path='/folder/:folderId' 
                  component={FilteredNoteList}
                  />
                <Route path='/note/:noteId' component={Note} />
              </NoteListError>
            </section>
          </div>
      </main>

      </NotefulContext.Provider>
    );
  }
}

export default App;