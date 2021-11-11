import { antenna_model, typeHeight } from "../../shared/helpers/antenna";
import { types } from "../../shared/types/types";


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
  console.log( 'Order Detail base: ', order )
  return async ( dispatch, getState ) => {
    dispatch( loadOrderDetail( ) );
    try{
      const { antennas } = getState( ).formsData;

      const orderDetail =  {
        url_rinex: order.base.url_rinex,
        base_name: order.base.base_name,
        antenna_model: antenna_model( antennas, order.base.antenna_model ),
        antenna_height: order.base.antenna_height,
        antenna_type_height: typeHeight( antennas, order.base.antenna_model, order.base.antenna_type_height ),
        // mobile_points: movingPoints( order.id, antennas, username ) || [], // TODO devolver la lista de mobile points ya procesados
      };

      dispatch( loadOrderDetailSuccess( orderDetail ) );
      console.log( orderDetail )

    }catch( error ){
      dispatch( loadOrderDetailError( 'No se pudo cargar los detalles de la solicitud.' ) );
      console.log( error );
    }
  }
}