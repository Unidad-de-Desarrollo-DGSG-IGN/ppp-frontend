import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { startChecking } from '../users/actions/auth';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import WorkRouter from './WorkRouter';

const AppRouter = ( ) => {
  // console.log( '<AppRouter.js>/<AppRouter>: AppRouter' );
  const dispatch = useDispatch( );

  const { checking } = useSelector( state => state.auth );
  const { uid } = useSelector( state => state.auth.data );
  // TODO : Revisar cuando se refresca la pagina, y se tiene los datos guardados.
  // const uid = localStorage.getItem('uid');
  
  useEffect( ( ) => {
    dispatch( startChecking( ) );
  }, [ dispatch ]);

  if ( checking ) {
    return ( <h5>Espere...</h5> ); // TODO : Realizar un componente de espera mejor diseñado
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path='/auth' isAuthenticated={ !!uid  } component={ AuthRouter } />

          <PrivateRoute path='/requests' isAuthenticated={ !!uid } component={ WorkRouter } />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
