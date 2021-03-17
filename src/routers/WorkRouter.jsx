import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import RequestNew from '../request/pages/RequestNew/RequestNew.page'
import Requests from '../request/pages/Requests/Requests.page'

const WorkRouter = ( ) => {
  return (
    <div>
      <Switch>
        <Route exact path='/requests'>
          <Requests />
        </Route>

        <Route exact path='/request-new'>
          <RequestNew />
        </Route>

        <Redirect to='/requests' />
      </Switch>
    </div>
  )
}

export default WorkRouter
