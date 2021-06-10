import { types } from "../../types/types";

const initialState = {
  checking: true,
  // isLogging: false,
}

export const userAuthReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
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
      }

    case types.authUserLoadingInfo:
      return {
        ...state,
        ...action.payload
      }
  
    default:
      return state;
  }
}