import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import { BiUserCircle } from 'react-icons/bi';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdSettings } from 'react-icons/io';

const iconSize = 25; 
const iconColor = 'white'; 
const userID = localStorage.getItem('userID');

const NavBar = ({ isLoggedIn, onLoginClick, onLogoutClick, onRegisterClick }) => {
   
  return (
    <nav className="navbar">
      <div className='item-logo'>
        <Link className="navbar-brand active" to="/">
          <img
            src={require('../images/logo.png')}
            alt="Logo bookmark-nest" 
            style={{ width: 'auto', height: '60px' }}
          />  
        </Link>       
      </div>

      <div className='item'>
        <SearchBar />
      </div>

      {isLoggedIn ? (          
        <div className='item'>
                    
          <Link className="navbar-brand" to={`/profile/${userID}`}>
            <BiUserCircle style={{ fontSize: iconSize, color: iconColor }} />
          </Link>

          <Link className="navbar-brand" to={`/settings/${userID}`}>
            <IoMdSettings style={{ fontSize: iconSize, color: iconColor }} />
          </Link>
          
          <Link className="navbar-brand" onClick={onLogoutClick} to="/">
            <RiLogoutCircleRLine style={{ fontSize: iconSize, color: iconColor }} />
          </Link>
        </div>
      ) : (
        <div className='item'>
          <Link to="/login">
            <button className="btn btn-light" onClick={onLoginClick}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-light" onClick={onRegisterClick}>
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;