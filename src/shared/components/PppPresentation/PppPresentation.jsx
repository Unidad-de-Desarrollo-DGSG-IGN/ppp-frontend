import React from 'react';

import image_logo from './../../../shared/images/logo_ign_intro.png';
import logo_ppp_ar from './../../../shared/images/logo_ppp-ar_intro.png';

const PppPresentation = ( ) => {
  return (
    <div className='logo-login' >
          <img src={ logo_ppp_ar } alt='Logo IGN PPP-Ar' className='logo' />
          <img src={ image_logo } alt='Logo IGN PPP-Ar' className='logo' style={{ height: "15rem" }}
          />
      </div>
  )
}

export default PppPresentation;
