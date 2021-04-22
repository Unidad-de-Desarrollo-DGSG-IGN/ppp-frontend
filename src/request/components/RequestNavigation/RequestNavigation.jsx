import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { startLogout } from '../../../users/actions/auth';
import { formDataLogout } from '../../actions/formData';
import { ordersLogout } from '../../actions/orderFetch';
import image_logo from './../../../images/logo.png';

const RequestNavigation = ( ) => {
  const dispatch = useDispatch( );

  const handleLogout = () => {
    dispatch( startLogout( ) );
    dispatch( formDataLogout( ) );
    dispatch( ordersLogout( ) );
  }

  return (
    <div className='nav--request'>
      {/* <hr/>
      <h1>Navegador Solicitudes</h1> */}
      <div className='logo-header' >
        <img src={ image_logo } alt='Logo IGN PPP-Ar' className='logo' />
        <h4>PPP-Ar</h4>
      </div>


      <div className='nav__options' >
        <div>
          <NavLink className='navlink' to='/requests/requests'>
          {/* <i class="fas fa-fw fa-table"></i> <span>Solicitudes</span> */}
            Solicitudes
          </NavLink>
        </div>

        <div>
          <NavLink className='navlink' to='/requests/request-new'>
            Nuevas solicitud
          </NavLink>
        </div>

        <div>
          <NavLink className='navlink' to='/requests/perfil'>
            Perfil
          </NavLink>
        </div>
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