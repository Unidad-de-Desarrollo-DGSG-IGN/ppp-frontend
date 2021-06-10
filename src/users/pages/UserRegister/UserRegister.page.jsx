import React from 'react';

import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import UserFormRegister from '../../components/UserFormRegister/UserFormRegister.component';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserRegister = ( ) => {
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
