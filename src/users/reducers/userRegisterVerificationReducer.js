import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
};

export const userRegisterVerificationReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.sendVerification:
      return {
        loading: true,
        error: null,
        data: null,
      }

    case types.sendVerification_success:
      return {
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.sendVerification_error:
      return {
        loading: false,
        error: action.payload,
        data: null,
      }
    
    case types.sendVerification_clean:
      return INITIAL_STATE;
  
    default:
      return state;
  }
};