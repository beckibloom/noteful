import React from 'react';
import './Sidebar.css';

class NoteSidebar extends React.Component {
  render() {
    return (
      <nav className='Sidebar' id='sidebar'>
          <button 
            className="go-back"
            onClick={() => this.props.routerProps.history.goBack()}
          >Go Back</button>
          <h2>Folder: {this.props.folder.name}</h2>
      </nav>
    );
  }
}

export default NoteSidebar;