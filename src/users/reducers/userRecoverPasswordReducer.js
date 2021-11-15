import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
};

export const userRecoverPasswordReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.sendRecoverPassword:
      return {
        loading: true,
        error: null,
        data: null,
      }

    case types.sendRecoverPassword_success:
      return {
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.sendRecoverPassword_error:
      return {
        loading: false,
        error: action.payload,
        data: null,
      }
    
    case types.sendRecoverPassword_clean:
      return INITIAL_STATE;
  
    default:
      return state;
  }
};