import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.js';
import Note from './Note.js';
import MainSidebar from './MainSidebar.js';
import NoteSidebar from './NoteSidebar.js';
import MainNoteList from './MainNoteList.js';
import FilteredNoteList from './FilteredNoteList.js';
import NotefulContext from './NotefulContext.js';
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
    //Implement two fetch requests to two endpoints when the application mounts: /folders and /notes. Store the response from these requests using a setState in whichever component you were keeping your dummy state.
    const foldersEndpoint = 'http://localhost:9090/folders';
    fetch(foldersEndpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))

    const notesEndpoint = 'http://localhost:9090/notes';
    fetch(notesEndpoint)
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
    }
    return (
      <NotefulContext.Provider value={contextValue}>

      <main className='App'>
        <Header />
          <div className='page-content'>
            <section>
              <Route exact path='/' component={MainSidebar} />
              <Route path='/folder/:folderId' component={MainSidebar} />
              <Route 
                path='/note/:noteId' 
                component={NoteSidebar}
                />
            </section>
            <section>
              <Route exact path='/' component={MainNoteList} />
              <Route 
                path='/folder/:folderId' 
                component={FilteredNoteList}
                />
              <Route path='/note/:noteId' component={Note} />
            </section>
          </div>
      </main>

      </NotefulContext.Provider>
    );
  }
}

export default App;