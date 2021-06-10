import React from 'react';

import image_logo from './../../../images/logo.png';

const PppPresentation = ( ) => {
  return (
    <div className='logo-login' >
      
          <img src={ image_logo } alt='Logo IGN PPP-Ar' className='logo' />
          <div>
            <h4>PPP-Ar</h4>
            <h3>Posicionamiento Puntual Preciso</h3>
          </div>

      </div>
  )
}

export default PppPresentation;
