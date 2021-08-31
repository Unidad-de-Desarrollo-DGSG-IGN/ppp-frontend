import { Provider } from 'react-redux';

import { store } from './shared/store/store';
import AppRouter from './routers/AppRouter';

const App = ( ) => {
  console.log( '<App.js>/<App>: APP' );
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default App;
