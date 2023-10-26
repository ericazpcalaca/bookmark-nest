import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';
import Model from 'react-modal';


const NavBar = () => {
  const [visible,setVisible] = useState(false);

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
          <button id="btnSignUp" className='btn' onClick={() => setVisible(true)}>Sign up</button>
          <Model isOpen={visible} onRequestClose={() => setVisible(false)}>
            <h1>Model body</h1>
            <button onClick={() => setVisible(false)}>Close model</button>
          </Model>

          <button id="btnLogin" className='btn'>Login</button>
        </div>        
      </div>      
    </nav>
  );
}

export default NavBar;
