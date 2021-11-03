import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import { authLoginClean } from '../../actions/auth';
import { sendRecoverPassword_clean } from '../../actions/recoverPassword';
import UserFormRegister from '../../components/UserFormRegister/UserFormRegister.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserRegister = ( ) => {
  const { error : error_login } = useSelector( state => state.auth );
  const dispatch = useDispatch( );

  useEffect( ( ) => {
    dispatch( sendRecoverPassword_clean( ) );
    if( error_login ) dispatch( authLoginClean( ) );
  }, [ dispatch, error_login ]);

  return (
    <div className='form' >
      <PppPresentation />

      <div className='user-fields' >
        <h1>Crear una Cuenta</h1>
        <hr/>
        <UserFormRegister />

        <UserNavigation />
      </div>
    </div>
  )
}

export default UserRegister
