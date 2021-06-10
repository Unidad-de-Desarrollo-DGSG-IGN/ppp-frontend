import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { startLogout } from '../../../users/actions/auth';
import { formDataLogout } from '../../actions/formData';
import { ordersLogout } from '../../actions/orderFetch';

const RequestUserNavigation = ( ) => {

  const dispatch = useDispatch( );

  const { firstname, lastname } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout( ) );
    dispatch( formDataLogout( ) );
    dispatch( ordersLogout( ) );
  }

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
