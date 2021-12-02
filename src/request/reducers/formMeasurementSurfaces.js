import { types } from "../../shared/types/types";

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [ ],
}

/**
 * Funcion que hace de Reductor. Funcion sincrona para modificar el estado de la aplicacion.
 * Modifica el estado de los datos del formulario de superficie de mediciones.
 * @param {object} state 
 * @param {object} action 
 * @returns {object} estado
 */
export const formMeasurementSurfaces = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case types.loadMeasurementSurfaces:
      return{
        loading: true,
        error: null,
        data: [ ],
      }

    case types.loadMeasurementSurfaces_success:
      return{
        loading: false,
        error: null,
        data: action.payload,
      }

    case types.loadMeasurementSurfaces_error:
      return{
        loading: false,
        error: action.payload,
        data: [ ],
      }
  
    case types.loadMeasurementSurfaces_clean:
      return INITIAL_STATE;

    default:
      return state;
  }
}