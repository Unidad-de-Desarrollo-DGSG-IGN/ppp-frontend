import React, { useEffect } from 'react';

import UserFormLogin from '../../components/UserFormLogin/UserFormLogin.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import { useDispatch } from 'react-redux';
import { sendRegisterClean } from '../../actions/register';
import { sendRecoverPassword_clean } from '../../actions/recoverPassword';

const UserLogin = ( ) => {
  const dispatch = useDispatch();

  useEffect( ( ) => {
    dispatch( sendRegisterClean( ) )
    dispatch( sendRecoverPassword_clean( ) );
  }, [ dispatch ] );

  return (
    <div className='form' >
      <PppPresentation />


      <div className='user-fields' >
        <h1>Bienvenido</h1>
        <hr/>
        <UserFormLogin />

        <UserNavigation />
      </div>
    </div>
  )
}

export default UserLogin;
