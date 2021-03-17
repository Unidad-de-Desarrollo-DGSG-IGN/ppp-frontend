import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavigation = ( ) => {
  return (
    <div>
      <hr/>
      <h1>Navegador Usuario</h1>

      <div>
        <NavLink to='/auth/login'>
          Ya tiene una cuenta? Acceda
        </NavLink>
      </div>

      <div>
        <NavLink to='/auth/recoverPassword'>
          ¿Olvidó su contraseña?
        </NavLink>
      </div>

      <div>
      <NavLink to='/auth/register'>
        Crear una cuenta
      </NavLink>
      </div>

    </div>
  )
}

export default UserNavigation
