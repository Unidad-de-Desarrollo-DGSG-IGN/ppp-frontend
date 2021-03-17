import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import UserNavigation from '../users/components/UserNavigation/UserNavigation.component';
import UserLogin from '../users/pages/UserLogin/UserLogin.page';
import UserRecoverPassword from '../users/pages/UserRecoverPassword/UserRecoverPassword.page';
import UserRegister from '../users/pages/UserRegister/UserRegister.page';

const AuthRouter = ( ) => {
  return (
    <div>
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

        <Redirect to='/auth/login' />
      </Switch>

      <UserNavigation />
    </div>
  )
}

export default AuthRouter
