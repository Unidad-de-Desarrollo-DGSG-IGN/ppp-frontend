import { types } from "../../shared/types/types";

const initialState = {
  checking: true,
  loading: false, // Analizar si conviene
  error: null,
  data: {},
}

export const userAuthReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    
    // Nuevos Casos para Login ----------------------
    case types.auth_login:
      return{
        // ...state,
        loading: true,
        error: null,
        data: {},

        checking: false, // Borrar en algun momento
      }

    case types.auth_login_success:
      return{
        // ...state,
        loading: false,
        error: null,
        data: {
          // uid: '',
          // username: '',
          // firstname: '',
          // lastname: '',
          ...action.payload,
        },

        checking: false, // Borrar en algun momento
      }
      
      case types.auth_login_error:
        return{
          // ...state,
          loading: false,
          error: 'Error en el login',
          data: {},
          checking: false, // Borrar en algun momento
      }
    // FIN - Nuevos Casos para Login ----------------------

    case types.authLogin:
      return{
        ...state,
        ...action.payload,
        checking: false
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }

    case types.authLogout:
      return {
        checking: false,
        loading: false,
        error: null,
        data: {},
      }

    case types.authUserLoadingInfo:
      // console.log( '<userAuthReducer>/<case authUserLoadingInfo> : payload: ', action.payload );
      return {
        ...state,
        // data: { ...action.payload } // Revisar que no sobreescriba todo DATA
      }
  
    default:
      return state;
  }
}