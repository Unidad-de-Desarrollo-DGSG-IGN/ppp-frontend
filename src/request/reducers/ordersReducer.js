import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  // ordersClient: [ ],
  loading: false,
  error: null,
  data: [ ],
}

/**
 * Funcion que hace de Reductor para cambiar el estado de la aplicacion a traves de Redux.
 * Modifica el estado de Las ordenes del usuario.
 * @param {object} state 
 * @param {object} action 
 * @returns 
 */
export const ordersLoadingReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    // NUEVO
    case types.loadOrders:
      return{
        loading: true,
        error: null,
        data: [ ...state.data ],
      }

    case types.loadOrders_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.loadOrders_error:
      return{
        loading: false,
        error: action.payload,
        data: [ ],
      }
    // FIN - NUEVO


    // case types.ordersLoading:
    //   return{
    //     ...state,
    //     ordersClient: action.payload,
    //   };

    case types.ordersLogout:
        return INITIAL_STATE;

    default:
      return state;
  }
}