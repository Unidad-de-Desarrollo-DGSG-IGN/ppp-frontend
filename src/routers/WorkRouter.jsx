import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import RequestFooter from '../request/components/RequestFooter/RequestFooter'
import RequestNavigation from '../request/components/RequestNavigation/RequestNavigation'
import UserNavigation from '../request/components/UserNavigation/UserNavigation'

import RequestNew from '../request/pages/RequestNew/RequestNew.page'
import Requests from '../request/pages/Requests/Requests.page'

const WorkRouter = ( ) => {
  return (
    <div className='layout--requests'>
      <UserNavigation />

      <Switch>
        <Route exact path='/requests/request-new'>
          <RequestNew />
        </Route>

        <Route exact path='/requests/requests'>
          <Requests />
        </Route>

        <Redirect to='/requests/requests' />
      </Switch>

      <RequestFooter />

      <RequestNavigation />
    </div>
  )
}

export default WorkRouter
