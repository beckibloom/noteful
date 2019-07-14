import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <Link to='/'>
          <h1>Noteful</h1>
        </Link>
      </header>
    );
  }
}

export default Header;