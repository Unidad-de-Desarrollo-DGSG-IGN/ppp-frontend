import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
};

/**
 * Funcion que hace de Reductor para cambiar el estado de la aplicacion a traves de Redux.
 * Carga la informacion de los detalles de la orden.
 * @param {object} state 
 * @param {object} action 
 * @returns 
 */
export const orderDetailReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.loadOrderDetail:
      return{
        loading: true,
        error: null,
        data: { ...state.data },
      };

    case types.loadOrderDetail_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      };

    case types.loadOrderDetail_error:
      return{
        loading: false,
        error: action.payload,
        data: null,
      };

    case types.loadOrderDetail_clean:
      return INITIAL_STATE;

    default:
      return state;
  }
}