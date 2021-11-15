import { types } from "../../shared/types/types";

const initialState = {
  antennas: [ ], // Borrar a futuro
  loading: false,
  error: null,
  data: [ ],
}

/**
 * Funcion que hace de Reductor. Funcion sincrona para modificar el estado de la aplicacion.
 * Modifica el estado de los datos del formulario. Como el de las antennas.
 * @param {object} state 
 * @param {object} action 
 * @returns {object} estado
 */
export const formDataReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    // NUEVO
    case types.loadFormData:
      return{
        loading: true,
        error: null,
        data: [ ],
      }

    case types.loadFormData_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.loadFormData_error:
      return{
        loading: false,
        error: action.payload,
        data: [ ],
      }
    // FIN - NUEVO

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