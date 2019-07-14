import React from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import NoteList from './NoteList.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <main className='App'>
        <Header />
        <div className='page-content'>
          <Sidebar />
          <NoteList />
        </div>
      </main>
    );
  }
}

export default App;