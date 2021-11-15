import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { useLogout } from '../../../shared/hooks/useLogout';


const RequestUserNavigation = ( ) => {
  const { firstname, lastname } = useSelector( state => state.auth.data );
  const { handleLogout } = useLogout( );

  return (
    <div className='nav-user-request' >
      <div>
        <NavLink className='navlink navlink--blue' activeClassName='navlink navlink--active' to='/requests/user-info'>
          <FontAwesomeIcon icon={ faUser } className='icon' /> Perfil - { lastname } { firstname }
        </NavLink>
      </div>

      <div>
        <button className='btn' onClick={ handleLogout }>
          <FontAwesomeIcon icon={ faSignOutAlt } className='icon icon--black' />
          Salir
        </button>
      </div>

    </div>
  )
}

export default RequestUserNavigation;
