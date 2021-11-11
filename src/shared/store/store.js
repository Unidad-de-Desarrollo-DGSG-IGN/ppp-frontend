import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


// Importaciones de Reducers
import { userAuthReducer } from './../../users/reducers/userAuthReducer';
import { formDataReducer } from './../../request/reducers/formDataReducer';
import { ordersLoadingReducer } from './../../request/reducers/ordersReducer';
import { newOrderReducer } from '../../request/reducers/newOrderReducer';
import { userRegisterReducer } from '../../users/reducers/userRegisterReducer';
import { userRegisterVerificationReducer } from '../../users/reducers/userRegisterVerificationReducer';
import { userRecoverPasswordReducer } from '../../users/reducers/userRecoverPasswordReducer';
import { reportReducer } from '../../request/reducers/reportReducer';
import { orderDetailReducer } from '../../request/reducers/orderDetailReducer';

// Herramienta para habilitar REDUX como herramienta de desarrollo en el Chrome
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Estados del Store, manejados por reducers
const reducers = combineReducers({
  auth: userAuthReducer,
  formsData: formDataReducer,
  orders: ordersLoadingReducer,
  orderDetail: orderDetailReducer,
  newOrder: newOrderReducer,
  register: userRegisterReducer,
  registerVerification: userRegisterVerificationReducer,
  recoverPassword: userRecoverPasswordReducer,
  downloadReport: reportReducer,
  downloadFile: ( ) => 'TODO : Download File',
});

export const store = createStore( 
  reducers,
  composeEnhancers(
    applyMiddleware( thunk )
  )
);
