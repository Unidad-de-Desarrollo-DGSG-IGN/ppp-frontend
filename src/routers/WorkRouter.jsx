import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { startFormDataLoadingAntenna } from '../request/actions/formData';
import RequestFooter from '../request/components/RequestFooter/RequestFooter';
import RequestNavigation from '../request/components/RequestNavigation/RequestNavigation';
import RequestUserNavigation from '../request/components/UserRequestNavigation/RequestUserNavigation';
import RequestNew from '../request/pages/RequestNew/RequestNew.page';
import RequestNewSuccess from '../request/pages/RequestNewSuccess/RequestNewSuccess';
import Requests from '../request/pages/Requests/Requests.page';
import UserInfo from '../request/pages/UserInfo/UserInfo';

const WorkRouter = ( ) => {
  console.log( '<WorkRouter.js>/<WorkRouter>: WorkRouter' );

  // const dispatch = useDispatch( );
  // TODO : Aca cargar los datoa de las antenas?. O junto cuando se dispara con login_success?
  //        * Usar useEffect []
  // useEffect( ( ) => {
  //   dispatch( startFormDataLoadingAntenna( ) ); // TODO : Mover unos componentes mas arriba
  //   // dispatch( startOrdersLoading( ) );
  // }, [ dispatch ] );

  useEffect( ( ) => {
    // console.log( '<PrivateRoute.jsx>/<PrivateRoute>: PrivateRoute' );
    // TODO : Aca debe ir la carga de los datos esenciales para formularios y personales del usuario.
    //        Cada vez que se "refresca la pagina", este metodo se ejecutara.
    //        * Aca pedir las antenas
    //        * Aca pedir los datos del usuario
    //        * ...
  }, [ ] );

  return (
    <div className='layout--requests'>
      <RequestUserNavigation />

      <Switch>
        <Route exact path='/requests/request-new'>
          <RequestNew />
        </Route>

        <Route exact path='/requests/request-new/success'>
          <RequestNewSuccess />
        </Route>

        <Route exact path='/requests/requests'>
          <Requests />
        </Route>

        <Route exact path='/requests/user-info'>
          <UserInfo />
        </Route>

        <Redirect to='/requests/requests' />
      </Switch>

      <RequestFooter />

      <RequestNavigation />
    </div>
  )
}

export default WorkRouter;
