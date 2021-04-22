import { types } from "../../types/types";

const initialState = {
  antennas: [ ],
}

export const formDataReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case types.formDataLoadingAntennas:
      return{
        ...state,
        antennas: action.payload,
      };
    
    case types.formDataLogout:
      return initialState;
  
    default:
      return state;
  }
}