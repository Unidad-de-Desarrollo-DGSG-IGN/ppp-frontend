import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: {},
}

export const newOrderReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.sendOrder:
      return{
        loading: true,
        error: null,
        data: {},
      };
  
    case types.sendOrder_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      };
  
    case types.sendOrder_error:
      return{
        loading: false,
        error: action.payload,
        data: {},
      };

    case types.sendOrder_logout:
      return INITIAL_STATE;

    default:
      return state;
  }
};