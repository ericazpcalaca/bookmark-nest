import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';
import { BiUserCircle } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuMessagesSquare } from 'react-icons/lu';

const iconSize = 25; 
const iconColor = 'white'; 

const NavBarLogged = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className='navbar-container'>
        <div className='item'>
          <div className='item-logo'>
            <Link to="/"><Logo/></Link>
            
          </div>
        </div>

        <div className='item'>
          <SearchBar />
        </div>
        
        <div className='item-logged'>
          <Link className="navbar-brand active" to="message">
            <LuMessagesSquare style={{ fontSize: iconSize, color: iconColor }} />
          </Link>

          <Link className="navbar-brand" to="notifications">
            <IoIosNotificationsOutline style={{ fontSize: iconSize, color: iconColor }} />
          </Link>
          
          <div className="navbar-brand" onClick={toggleDropdown} ref={dropdownRef}>
            <BiUserCircle style={{ fontSize: iconSize, color: iconColor }} />
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link><br/>
                <Link to="/settings">Settings</Link>
                {/* Add more menu items as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLogged;
