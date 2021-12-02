import { antenna_model, typeHeight } from "../../shared/helpers/antenna";
import { measurementSurfaceModel } from "../../shared/helpers/measurementSurface";
import { types } from "../../shared/types/types";
import { startLoadMeasurementSurface } from "./MeasurementSurfacesFetch";


// Order Detail Actions
// TODO : Hacer la documentacion de las ACTIONS

const loadOrderDetail = ( ) => ({
  type: types.loadOrderDetail,
});


const loadOrderDetailSuccess = ( orderDetail ) => ({
  type: types.loadOrderDetail_success,
  payload: orderDetail,
});


const loadOrderDetailError = ( errorMsg ) => ({
  type: types.loadOrderDetail_error,
  payload: errorMsg,
});


export const loadOrderDetailClean = ( ) => ({
  type: types.loadOrderDetail_clean,
});


export const startLoadOrderDetail = ( order ) => {
  // console.log( 'Order Detail base: ', order );
  return async ( dispatch, getState ) => {
    dispatch( loadOrderDetail( ) );
    try{
      const { antennas } = getState( ).formsData;

      // dispatch( startLoadMeasurementSurface( ) );
      // TODO : Ver como cargar aca de forma sincronica la lista de measure
      const { data : measurementSurfaceList } = getState( ).measurementSurfaces;
      // console.log( 'measure list: ', measurementSurfaceList)
      // console.log( 'Cruce de measure surface: ' , measurementSurfaceModel( measurementSurfaceList, order.base.measurementSurfaceId ))

      const orderDetail =  {
        url_rinex: order.base.url_rinex,
        base_name: order.base.base_name,
        antenna_model: antenna_model( antennas, order.base.antenna_model ),
        antenna_height: order.base.antenna_height,
        antenna_type_height: typeHeight( antennas, order.base.antenna_model, order.base.antenna_type_height ),
        measurementSurface: measurementSurfaceModel( measurementSurfaceList, order.base.measurementSurfaceId ),
        // mobile_points: movingPoints( order.id, antennas, username ) || [], // TODO devolver la lista de mobile points ya procesados
      };

      dispatch( loadOrderDetailSuccess( orderDetail ) );
      // console.log( orderDetail )

    }catch( error ){
      dispatch( loadOrderDetailError( 'No se pudo cargar los detalles de la solicitud.' ) );
      // console.log( error );
    }
  }
}