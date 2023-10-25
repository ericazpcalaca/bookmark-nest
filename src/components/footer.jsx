import React from 'react';
import Logo from './logo';


const Footer = () => {
  return (
    <footer className='footerBar'>
        <div className='item-footer'>
            <Logo />
            <p id='copyright'>© 2023 bookmark nest, Inc.</p>
        </div>
        
    </footer>
  );
}

export default Footer;
