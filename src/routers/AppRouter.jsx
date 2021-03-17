import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { startChecking } from '../users/actions/auth';

import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import WorkRouter from './WorkRouter';

const AppRouter = (  ) => {
  const dispatch = useDispatch();

  const { checking, uid } = useSelector( state => state.auth );
  
  useEffect(() => {
        
    dispatch( startChecking() );

  }, [dispatch])

  if ( checking ) {
    return (<h5>Espere...</h5>);
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path='/auth' isAuthenticated={ !!uid  } component={ AuthRouter } />

          <PrivateRoute exact path='/requests' isAuthenticated={ !!uid } component={ WorkRouter } />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter