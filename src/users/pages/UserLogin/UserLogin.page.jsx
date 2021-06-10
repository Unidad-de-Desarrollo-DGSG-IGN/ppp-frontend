import React from 'react';

import UserFormLogin from '../../components/UserFormLogin/UserFormLogin.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';

const UserLogin = ( ) => {

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
