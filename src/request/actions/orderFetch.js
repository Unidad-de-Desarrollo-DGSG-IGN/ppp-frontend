import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { types } from '../../types/types';


// HELPERS - TODO : Revisar problema de sincronizacion, se puede arreglar por useEffect que cuando cambie un estado se vuelva a calcular

const antenna_model = ( antennas, antennaId ) => {
  return antennas.find( antenna => antenna.id === antennaId ).name ;
};


const typeHeight = ( antennas, antennaId, antennaHeightTypeId ) => {
  const antenna_order = antennas.find( antenna => antenna.id === antennaId );
  return antenna_order.height_types.find( height_type => height_type.id === antennaHeightTypeId ).name;
}


// ACTIONS
export const ordersLogout = ( ) => ({
  type: types.ordersLogout,
});


const ordersLoading = ( orders ) => ({
  type: types.ordersLoading,
  payload: orders,
});


export const startOrdersLoading = ( ) => {
  return async ( dispatch ) => {
    try{
      const res = await fetchSinToken( 'antennas' );
      const dataJson = await res.json();
      console.log('antennas : ' ,dataJson.data.antennas);
      const antennas = dataJson.data.antennas;
  
      const resList = await fetchConToken( 'orders' );
      const resOrders = await resList.json ();
      console.log( 'Ordenes Crudos : ', resOrders.data.orders );
      const orders =  await resOrders.data.orders.map( order => ({
        // TODO : Faltan campos de fecha, estado, etc
        date_order: new Date( ).toString(),
        state_order: 'En proceso',
        base_point :{
          url_rinex: '',
          base_name: order.name,
          antenna_model: antenna_model( antennas, order.antennaId ),
          antenna_height: order.height,
          antenna_type_height: typeHeight( antennas, order.antennaId, order.antennaHeightTypeId ),
        },
        mobile_points: {
          // TODO : Completar con puntos adicionales
        }
      }) );
      dispatch( ordersLoading( orders ) ); 
    }catch( err ){
      console.log( 'No se pudo cargar la orden correctamente');
    }
  }
}