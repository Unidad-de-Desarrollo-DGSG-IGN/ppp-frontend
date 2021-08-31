import React from 'react';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';

import UserFormRecoverPass from '../../components/UserFormRecoverPass/UserFormRecoverPass.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserRecoverPassword = ( ) => {
  console.log( '<UserRecoverPassword.page.js>/<UserRecoverPassword>: UserRecoverPassword' );
  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>¿Olvidó su contraseña?</h1>
        <hr />
        <p>Simplemente ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para restablecer su contraseña.</p>
        <UserFormRecoverPass />

        <UserNavigation />
      </div>
    </div>
  )
}

export default UserRecoverPassword;
