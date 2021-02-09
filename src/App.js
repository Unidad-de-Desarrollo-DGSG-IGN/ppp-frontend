import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import UserRegister from './users/pages/UserRegister/UserRegister.page';
import UserLogin from './users/pages/UserLogin/UserLogin.page';
import UserRecoverPassword from './users/pages/UserRecoverPassword/UserRecoverPassword.page';
import UserNavigation from './users/components/UserNavigation/UserNavigation.component';
import Requests from './request/pages/Requests/Requests.page';
import RequestNew from './request/pages/RequestNew/RequestNew.page';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/login'>
            <UserLogin />
          </Route>
          <Route exact path='/register'>
            <UserRegister /> 
          </Route>
          <Route exact path='/recoverPassword'>
            <UserRecoverPassword />
          </Route>
          <Route exact path='/requests'>
            <Requests />
          </Route>
          <Route exact path='/request-new'>
            <RequestNew />
          </Route>
          <Redirect to='login' />
      </Switch>
      <UserNavigation />
    </Router>
  );
}

export default App;
