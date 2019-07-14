import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import NoteList from './NoteList.js';
import Note from './Note.js';
import NOTES from './dummy-store.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = NOTES
  }
  render() {
    return (
      <main className='App'>
        <Header />
        <div className='page-content'>
          <Sidebar folders={this.state.folders} />
          <Route
            exact path='/'
            component={NoteList}
          />
          <Route 
            path='/note/:noteId'
            component={Note}
          />
        </div>
      </main>
    );
  }
}

export default App;