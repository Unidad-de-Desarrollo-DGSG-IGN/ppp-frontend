import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
}

export const reportReducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.downloadReport:
      return{
        loading: true,
        error: null,
        data: null,
      };
  
    case types.downloadReport_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      };
  
    case types.downloadReport_error:
      return{
        loading: false,
        error: action.payload,
        data: null,
      };

    case types.downloadReport_clean:
      return INITIAL_STATE;

    default:
      return state;
  }
};