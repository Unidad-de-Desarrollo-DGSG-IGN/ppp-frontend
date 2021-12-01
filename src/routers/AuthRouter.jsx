import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SetNewPassword from '../users/pages/SetNewPassword/SetNewPassword';

import UserLogin from '../users/pages/UserLogin/UserLogin.page';
import UserRecoverPassword from '../users/pages/UserRecoverPassword/UserRecoverPassword.page';
import UserRegister from '../users/pages/UserRegister/UserRegister.page';
import UserVerification from '../users/pages/UserVerification/UserVerification';

const AuthRouter = ( ) => {
  // console.log( '<AuthRouter.js>/<AuthRouter>: AuthRouter' );

  return (
    <div className='auth' >
      <Switch>
        <Route exact path='/auth/login'>
          <UserLogin />
        </Route>

        <Route exact path='/auth/register'>
          <UserRegister />
        </Route>

        <Route exact path='/auth/recoverPassword'>
          <UserRecoverPassword />
        </Route>

        <Route path='/auth/verification/:code'>
          <UserVerification />
        </Route>

        <Route path='/auth/change-password/:code'>
          <SetNewPassword />
        </Route>

        <Redirect to='/auth/login' />
      </Switch>
      
    </div>
  )
}

export default AuthRouter;
