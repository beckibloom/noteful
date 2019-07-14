import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  render() {
    return (
      <section className='Sidebar' id='sidebar'>
          <ul>
              <li className="folder">Folder 1</li>
              <li className="folder">Folder 2</li>
              <li className="folder">Folder 3</li>
          </ul>
          <button className="add-folder">Add Folder</button>
      </section>
    );
  }
}

export default Sidebar;