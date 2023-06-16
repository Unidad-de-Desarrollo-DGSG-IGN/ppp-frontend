import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import ReportQR from '../request/pages/ReportQR/ReportQR';

import { startChecking } from '../users/actions/auth';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import WorkRouter from './WorkRouter';

const AppRouter = ( ) => {
  const dispatch = useDispatch( );

  const { checking } = useSelector( state => state.auth );
  const { uid } = useSelector( state => state.auth.data );
  
  useEffect( ( ) => {
    dispatch( startChecking( ) );
  }, [ dispatch ]);

  if ( checking ) {
    return ( <h5>Cargando...</h5> );
  }

  return (
    <Router basename={ `${process.env.PUBLIC_URL}` } >
      <div>
        <Switch>
          <Route path='/report/:code/:base' component={ ( ) => <div className='auth' > <ReportQR /> </div> } />

          <PublicRoute path='/auth' isAuthenticated={ !!uid  } component={ AuthRouter } />

          <PrivateRoute path='/requests' isAuthenticated={ !!uid } component={ WorkRouter } />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
