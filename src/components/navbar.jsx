import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';
import Model from 'react-modal';
import Login from './login';
import SignUp from './signUp';


const NavBar = () => {
  const [visible,setVisible] = useState(false);

  // Modal styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%', // Set the desired width
      maxWidth: 'auto', // Set a maximum width
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

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
          <Model 
            isOpen={visible} 
            onRequestClose={() => setVisible(false)}
            style={customStyles}>
              <SignUp />
              {/* <button onClick={() => setVisible(false)}>Close model</button> */}
          </Model>

          <button id="btnLogin" className='btn'>Login</button>
        </div>        
      </div>      
    </nav>
  );
}

export default NavBar;
