import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Importaciones de Reducers
import { userAuthReducer } from '../users/reducers/userAuthReducer';

// Herramienta para habilitar REDUX como herramienta de desarrollo en el Chrome
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Estados del Store, manejados por reducers
const reducers = combineReducers({
  auth: userAuthReducer,
});

export const store = createStore( 
  reducers,
  composeEnhancers(
    applyMiddleware( thunk )
  )
  )
