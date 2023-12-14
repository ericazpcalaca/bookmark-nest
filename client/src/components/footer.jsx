import React from 'react';


const Footer = () => {
  return (
    <footer className='footerBar'>
        <div className='item-footer'>
            <img
              src={require('../images/logo.png')}
              alt="Logo"
              style={{ width: 'auto', height: '50px' }}
            /> 
            <p id='copyright'>© 2023 bookmark nest, Inc. - created by Erica Zasimowicz Pinto Calaca</p>
        </div>
        
    </footer>
  );
}

export default Footer;
