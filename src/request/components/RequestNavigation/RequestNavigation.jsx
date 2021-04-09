import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { startLogout } from '../../../users/actions/auth';

const RequestNavigation = ( ) => {
  const dispatch = useDispatch( );

  const handleLogout = () => {
    dispatch( startLogout() );
  }

  return (
    <div className='nav--request'>
      <hr/>
      <h1>Navegador Solicitudes</h1>

      <div>
        <NavLink to='/requests/requests'>
          Solicitudes
        </NavLink>
      </div>

      <div>
        <NavLink to='/requests/request-new'>
          Nuevas solicitud
        </NavLink>
      </div>

      <div>
        <NavLink to='/requests/perfil'>
          Perfil
        </NavLink>
      </div>

      <div>
        <button className='btn btn--white' onClick={ handleLogout }>
          Salir
        </button>
      </div>

    </div>
  )
}

export default RequestNavigation