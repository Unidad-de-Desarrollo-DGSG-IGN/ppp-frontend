import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faTable, faList } from '@fortawesome/free-solid-svg-icons';

import { useLogout } from '../../../shared/hooks/useLogout';


const UserRequestNavigationResponsive = ( ) => {
  const { firstname, lastname } = useSelector( state => state.auth.data );
  const { handleLogout } = useLogout( );

  return (
    <div className='nav-user-request--responsive' >
      <div className='nav__options' >
          <NavLink className='navlink navlink--white navlink--white--dark-bg' activeClassName='navlink navlink--active navlink--active--dark-bg' to='/requests/requests'>
            <FontAwesomeIcon icon={ faTable } className='icon' /> Solicitudes
          </NavLink>


          <NavLink className='navlink navlink--white navlink--white--dark-bg' activeClassName='navlink navlink--active navlink--active--dark-bg' to='/requests/request-new'>
            <FontAwesomeIcon icon={ faList } className='icon' /> Nueva solicitud
          </NavLink>
      </div>

      <div className='profile'>
        <div>
          <NavLink className='navlink navlink--blue' activeClassName='navlink navlink--active' to='/requests/user-info'>
            <FontAwesomeIcon icon={ faUser } className='icon' /> Perfil
          </NavLink>
        </div>

        <div>
          <button className='btn' onClick={ handleLogout }>
            <FontAwesomeIcon icon={ faSignOutAlt } className='icon icon--black' />
            Salir
          </button>
        </div>
      </div>

    </div>
  )
}

export default UserRequestNavigationResponsive;
