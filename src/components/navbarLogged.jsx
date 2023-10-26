import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';
import SearchBar from './searchBar';
import {BiUserCircle} from 'react-icons/bi';
import {IoIosNotificationsOutline} from 'react-icons/io';
import {LuMessagesSquare} from 'react-icons/lu';

const NavBarLogged = () => {
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
        <div className='item-logged'>
            <Link className="navbar-brand active" to="/"> <LuMessagesSquare /> </Link>
            <Link className="navbar-brand" to="addcolor"> <IoIosNotificationsOutline /></Link>
            <Link className="navbar-brand" to="others"> <BiUserCircle /> </Link>
        </div>        
      </div>      
    </nav>
  );
}

export default NavBarLogged;
