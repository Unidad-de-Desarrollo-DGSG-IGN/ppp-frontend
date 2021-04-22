import { types } from '../../types/types';
import { fetchSinToken } from '../../helpers/fetch';

// ACTIONS

const formDataLoadingAntenna = ( antennas ) => ({
  type: types.formDataLoadingAntennas,
  payload: antennas
});


export const startFormDataLoadingAntenna = ( ) => {
  return async ( dispatch ) => {
    try{
      const res = await fetchSinToken( 'antennas' );
      const dataJson = await res.json();
      let antennas = dataJson.data.antennas;
      dispatch( formDataLoadingAntenna( antennas ) );
    }
    catch( err ){
      console.log( 'Error al cargar antennas para el formulario' );
      console.log( err );
    }
  }
}


export const formDataLogout = () => ({
  type: types.formDataLogout
})