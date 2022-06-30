import { types } from '../../shared/types/types';
import { fetchSinToken } from '../../shared/helpers/fetch';

// ACTIONS

// TODO : Esribir los Reducers de seguimiento para la carga de antennas.

/**
 * Es una funcion que devuelve un objeto en el formato de una action que requiere redux.
 * Recibe como parametro la lista de antenas. 
 * Devuelve una action con tal lista como payload, y el type correspondiente para modificar el estado de la lista de antenas.
 * @param {string} antennas Lista de antenas disponibles.
 * @returns {object} action
 * 
 */
const formDataLoadingAntenna = ( antennas ) => ({
  type: types.formDataLoadingAntennas,
  payload: antennas,
});


/**
 * Es una funcion que modifica de forma asincronica el estado en redux con un objeto en el formato de una action que requiere redux.
 * TODO: En caso de ocurrir algun error modificara el estado de ERROR de forma sincrona.
 * No recibe parametros.
 * Devuelve un funcion asincronica, donde luego se llevara a cabo la modificacion del estado de forma sincronica.
 * @returns {function} action function
 */
export const startFormDataLoadingAntenna = ( ) => {
  return async ( dispatch ) => {
    try{
      const res = await fetchSinToken( 'antennas' );
      const dataJson = await res.json( );
      let antennas = dataJson.data.antennas;
      dispatch( formDataLoadingAntenna( antennas ) );
    }
    catch( err ){
      // TODO : UX Manejar el error cambiando el estado de ERRORES de forma sincronica
    }
  }
};


/**
 * Es una funcion que modifica de forma asincronica el estado en redux con un objeto en el formato de una action que requiere redux.
 * No recibe parametros.
 * Devuelve una action, solo indicando el tipo de action cuando se produce el logout del usuario.
 * @returns {object} action
 */
export const formDataLogout = ( ) => ({
  type: types.formDataLogout,
});