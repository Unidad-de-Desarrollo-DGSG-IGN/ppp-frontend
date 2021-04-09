import React from 'react';
import UserFormRecoverPass from '../../components/UserFormRecoverPass/UserFormRecoverPass.component';

import './UserRecoverPassword.page.style.css';

const UserRecoverPassword = ( ) => {
  return (
    <div class='form'>
      <h1>¿Olvidó su contraseña?</h1>
      <p>Simplemente ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para restablecer su contraseña.</p>
      <UserFormRecoverPass />
    </div>
  )
}

export default UserRecoverPassword
