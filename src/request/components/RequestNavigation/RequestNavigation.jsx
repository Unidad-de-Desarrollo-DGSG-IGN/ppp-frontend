import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faList } from '@fortawesome/free-solid-svg-icons';

import image_logo from './../../../shared/images/logo.png';

const RequestNavigation = ( ) => {
  return (
    <div className='nav--request'>

      <div className='logo-header' >
        <img src={ image_logo } alt='Logo IGN PPP-Ar' className='logo' />
        <h4>PPP-Ar</h4>
      </div>

      <div className='nav__options' >
          <NavLink className='navlink navlink--white' activeClassName='navlink navlink--active' to='/requests/requests'>
            <FontAwesomeIcon icon={ faTable } className='icon' /> Solicitudes
          </NavLink>


          <NavLink className='navlink navlink--white' activeClassName='navlink navlink--active' to='/requests/request-new'>
            <FontAwesomeIcon icon={ faList } className='icon' /> Nueva solicitud
          </NavLink>
      </div>

    </div>
  )
}

export default RequestNavigation;