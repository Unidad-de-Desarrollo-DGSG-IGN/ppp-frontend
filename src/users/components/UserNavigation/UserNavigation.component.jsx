import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavigation = ( ) => {
  return (
    <div className='nav--user'>
      <hr/>

        <NavLink to='/auth/login' activeClassName='link--active' className='navlink'>
          ¿Ya tiene una cuenta? Acceda
        </NavLink>

        <NavLink to='/auth/recoverPassword' activeClassName='link--active' className='navlink'>
          ¿Olvidó su contraseña?
        </NavLink>

      <NavLink to='/auth/register' activeClassName='link--active' className='navlink'>
        Crear una cuenta
      </NavLink>

    </div>
  )
}

export default UserNavigation;
