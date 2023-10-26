import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';
import Model from 'react-modal';
import Modal from 'react-modal';
import LogSinScreen from './logSinScreen';


const NavBar = () => {
  const [visible,setVisible] = useState(false);
  const [typeAction,setTypeAction] = useState("");

  /*
  To resolve the "App element is not defined" warning 
  for the react-modal library, I set the app element 
  using the Modal.setAppElement(el) method with the root 
  element of my application.
  */
  useEffect(() => {
    Modal.setAppElement('.App'); 
  }, []);
  
 
  const openModal = (action) => {
    setVisible(true);
    setTypeAction(action); // Set the typeAction based on the button clicked
  };

  const closeModal = () => {
    setVisible(false);
  };

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
          <button id="btnSignUp" className='btn' onClick={() => openModal("sign up")}>Sign up</button>
          <button id="btnLogin" className='btn' onClick={() => openModal("login")}>Login</button>

          <Model 
            isOpen={visible} 
            onRequestClose={closeModal}
            style={customStyles}>
              <LogSinScreen 
                typeAction={typeAction}/>
          </Model>

        </div>        
      </div>      
    </nav>
  );
}

export default NavBar;
