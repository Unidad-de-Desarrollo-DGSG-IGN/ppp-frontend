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
        loading: false,
        error: null,
        data: {
          ...action.payload,
        },

        checking: false, 
      }
      
      case types.auth_login_error:
        return{
          loading: false,
          error: 'Error al acceder',
          data: {},
          checking: false,
      }

      case types.auth_login_clean:
        return {
          checking: false,
          loading: false,
          error: null,
          data: {},
        };
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