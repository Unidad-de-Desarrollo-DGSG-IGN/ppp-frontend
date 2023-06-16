import { fetchSinToken } from '../../shared/helpers/fetch';
import { types } from '../../shared/types/types';


const LoadMeasurementSurfaces = ( ) => ({
  type: types.loadMeasurementSurfaces,
});


const LoadMeasurementSurfaceSuccess = ( orders ) => ({
  type: types.loadMeasurementSurfaces_success,
  payload: orders,
});


const LoadMeasurementSurfaceError = ( errorMsg ) => ({
  type: types.loadMeasurementSurfaces_error,
  payload: errorMsg,
});


export const LoadMeasurementSurfaceCLean = ( ) => ({
  type: types.loadMeasurementSurfaces_clean,
});


export const startLoadMeasurementSurface = ( ) => {
  return async ( dispatch, getState ) => {
    dispatch( LoadMeasurementSurfaces( ) );
    try{
      const res = await fetchSinToken( 'measurement-surfaces' );

      const dataJson = await res.json( );
      let measurementSurfaces = dataJson.data.measurementSurfaces;
      dispatch( LoadMeasurementSurfaceSuccess( measurementSurfaces ) );
    }
    catch( err ){
      let errorMsg = 'Error al cargar medidas superficiales para el formulario';
      dispatch( LoadMeasurementSurfaceError( errorMsg ) );
    }
  }
};