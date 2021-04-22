import { types } from "../../types/types";

const initialState = {
  ordersClient: [ ],
}

export const ordersLoadingReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case types.ordersLoading:
      return{
        ...state,
        ordersClient: action.payload,
      };

    case types.ordersLogout:
        return initialState;

    default:
      return state;
  }
}