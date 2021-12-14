import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import { authLoginClean } from '../../actions/auth';
import { sendRegisterClean } from '../../actions/register';

import UserFormRecoverPass from '../../components/UserFormRecoverPass/UserFormRecoverPass.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserRecoverPassword = ( ) => {
  const { error : error_login } = useSelector( state => state.auth );
  const dispatch = useDispatch( );

  useEffect( ( ) => {
    dispatch( sendRegisterClean( ) );
    if( error_login ) dispatch( authLoginClean( ) );
  }, [ dispatch, error_login ]);

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>¿Olvidó su contraseña?</h1>
        <hr />
        <p>Por favor, ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.</p>
        <UserFormRecoverPass />

        <UserNavigation />
      </div>
    </div>
  )
}

export default UserRecoverPassword;
