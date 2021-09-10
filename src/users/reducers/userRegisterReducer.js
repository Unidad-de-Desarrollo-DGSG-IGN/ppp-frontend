import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
};

export const userRegisterReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.sendRegister:
      return {
        loading: true,
        error: null,
        data: null,
      }

    case types.sendRegister_success:
      return {
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.sendRegister_error:
      return {
        loading: true,
        error: action.payload,
        data: null,
      }
  
    default:
      return state;
  }
};