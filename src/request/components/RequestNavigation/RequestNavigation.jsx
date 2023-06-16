import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faList } from '@fortawesome/free-solid-svg-icons';

import ppp_logo from './../../../shared/images/logo_ppp-ar_request.png';

const RequestNavigation = ( ) => {
  return (
    <div className='nav--request'>

      <div className='logo-header' >
        <img src={ ppp_logo } alt='Logo IGN PPP-Ar' className='logo' style={{height: "15rem"}} />
      </div>

      <div className='nav__options nav__options--responsive' >
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