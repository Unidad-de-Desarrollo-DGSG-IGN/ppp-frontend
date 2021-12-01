import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
};

export const userResetPasswordReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.sendResetPassword:
      return {
        loading: true,
        error: null,
        data: null,
      }

    case types.sendResetPassword_success:
      return {
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.sendResetPassword_error:
      return {
        loading: false,
        error: action.payload,
        data: null,
      }
    
    case types.sendResetPassword_clean:
      return INITIAL_STATE;
  
    default:
      return state;
  }
};