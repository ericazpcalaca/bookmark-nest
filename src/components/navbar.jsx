import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';


const NavBar = () => {
  return (
    <nav className="navbar">
      <div className='navbar-container'>
        <div className='item'>
          <div className='item-logo'>
            <Logo/>
          </div>          
        </div>
        <div className='item'>
          <SearchBar />
        </div>
        <div className='item'>
          <button id="btnSignUp" className='btn'>Sign up</button>
          <button id="btnLogin" className='btn'>Login</button>
        </div>        
      </div>      
    </nav>
  );
}

export default NavBar;
