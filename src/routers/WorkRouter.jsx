import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import RequestFooter from '../request/components/RequestFooter/RequestFooter';
import RequestNavigation from '../request/components/RequestNavigation/RequestNavigation';
import RequestUserNavigation from '../request/components/UserRequestNavigation/RequestUserNavigation';
import RequestNew from '../request/pages/RequestNew/RequestNew.page';
import Requests from '../request/pages/Requests/Requests.page';
import UserInfo from '../request/pages/UserInfo/UserInfo';

const WorkRouter = ( ) => {

  return (
    <div className='layout--requests'>
      <RequestUserNavigation />

      <Switch>
        <Route exact path='/requests/request-new'>
          <RequestNew />
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

export default WorkRouter
