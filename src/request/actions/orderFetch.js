import { fetchConToken } from '../../shared/helpers/fetch';
import { types } from '../../shared/types/types';


// HELPERS
// TODO : Revisar problema de sincronizacion, se puede arreglar por useEffect que cuando cambie un estado se vuelva a calcular
// TODO : Trasladar los helpers a otro archivo para poder reutilizarlos
// TODO : Revisar y decidir que pasa cuando una propiedad no existe
// TODO : Documentar las funciones

const antenna_model = ( antennas, antennaId ) => {
  return antennas.find( antenna => antenna.id === antennaId ).name ;
};

const stateOrder = ( status ) => {
  switch ( status ) {
    case 'PROCESSING':
      return 'Procesando';

    case 'CANCELLED':
      return 'Cancelado';

    case 'FINISHED':
      return 'Terminado';
  
    default:
      return 'Procesando';
  }
};

const typeHeight = ( antennas, antennaId, antennaHeightTypeId ) => {
  const antenna_order = antennas.find( antenna => antenna.id === antennaId );
  return antenna_order.height_types.find( height_type => height_type.id === antennaHeightTypeId ).name;
};

// TODO : Revisar el fetchConToken, pasar el username, o levantarlo desde el LocalStorage. O hacer una accion cargar orders: LoadOrders
const movingPoints = async( orderId, antennas, username ) => {
  const res = await fetchConToken( `orders/${ orderId }`, username );
  const resOrders = await res.json ();
  // console.log( '<orderFetch.js>/<movingPoints>: Moving Point: ', resOrders.data.order.movingPoints );

  return resOrders.data.order.movingPoints.map( movingPoint => ({
    url_rinex: movingPoint.file.id,
    base_name: movingPoint.name,
    antenna_model: antenna_model( antennas, movingPoint.antennaId ),
    antenna_height: movingPoint.heigth,
    antenna_type_height: typeHeight( antennas, movingPoint.antennaId, movingPoint.antennaHeightTypeId ),
  }));
  // return( resOrders.data.order.movingPoints );
};


// ACTIONS

/**
 * Es una funcion que devuelve un objeto en el formato de una action que requiere redux.
 * Devuelve una action, solo indicando el tipo de action cuando se produce el logout del usuario.
 * @returns {object} action
 */
export const ordersLogout = ( ) => ({
  type: types.ordersLogout,
});


/**
 * Es una funcion que devuelve un objeto en el formato de una action que requiere redux.
 * Recibe una lista del tipo de orders del usuario.
 * Devuelve una action con el tipo para cargar las ordenes, y el payload donde estan la lista de las ordenes
 * @param {object[]} orders 
 * @returns {object} action
 */
// const ordersLoading = ( orders ) => ({
//   type: types.ordersLoading,
//   payload: orders,
// });

// NUEVO
const LoadOrders = ( ) => ({
  type: types.loadOrders,
});

const LoadOrdersSuccess = ( orders ) => ({
  type: types.loadOrders_success,
  payload: orders,
});

const LoadOrdersError = ( errorMsg ) => ({
  type: types.loadOrders_success,
  payload: errorMsg,
});
// FIN - NUEVO


/**
 * Es una funcion que modifica de forma asincronica el estado en redux con un objeto en el formato de una action que requiere redux.
 * TODO: En caso de ocurrir algun error modificara el estado de ERROR de forma sincrona.
 * No recibe parametros.
 * Devuelve un funcion asincronica, donde luego se llevara a cabo la modificacion del estado de forma sincronica.
 * @returns {function} action function
 */
export const startOrdersLoading = ( ) => {
  return async ( dispatch, getState ) => {
    dispatch( LoadOrders( ) );
    try{
      const { antennas } = getState( ).formsData;
      const { username }  = getState( ).auth.data;
      console.log( 'startOrdersLoading, username:', username );
      // console.log( '<orderFetch.js>/<startOrdersLoading> : antennas desde el estado', antennas );
      // console.log( '<orderFetch.js>/<startOrdersLoading> : username', username );
      
      // const res = await fetchSinToken( 'antennas' );
      // const dataJson = await res.json( );
      // console.log( '<orderFetch.js>/<startOrdersLoading> : antennas desde el URL', dataJson.data.antennas );
      // console.log( '<orderFetch.js>/<startOrdersLoading>: antennas : ' , dataJson.data.antennas);
      // const antennas = dataJson.data.antennas;
  

      // TODO : Como transformar este llamado para que pueda acceder al username(getState, ademas del dispatch)
      const resList = await fetchConToken( 'orders', username );
      // console.log( '<orderFetch.js>/<startOrdersLoading>: Respuesta Lista con token: ', resList );
      const resOrders = await resList.json( );
      // console.log( '<orderFetch.js>/<startOrdersLoading>: Ordenes Crudos : ', resOrders.data.orders );
      
      // const orders =  await resOrders.data.orders.map( ( order ) => ({
      //   date_order: order.creationDate,
      //   state_order: order.status,
      //   base_point :{
      //     url_rinex: '',
      //     base_name: order.name,
      //     antenna_model: antenna_model( antennas, order.antennaId ),
      //     antenna_height: order.height,
      //     antenna_type_height: typeHeight( antennas, order.antennaId, order.antennaHeightTypeId ),
      //   },
      //   // mobile_points: await movingPoints( order.id ) || [], // TODO devolver la lista de mobile points ya procesados
      // }) );

      const orders =  await resOrders.data.orders.map( async( order ) => ({
        date_order: order.creationDate,
        state_order: stateOrder( order.status ),
        base_point :{
          url_rinex: order.fileId,
          base_name: order.name,
          antenna_model: antenna_model( antennas, order.antennaId ),
          antenna_height: order.height,
          antenna_type_height: typeHeight( antennas, order.antennaId, order.antennaHeightTypeId ),
        },
        mobile_points: await movingPoints( order.id, antennas, username ) || [], // TODO devolver la lista de mobile points ya procesados
      }));

      Promise.all( orders ).then( result => {
        // console.log( '<orderFetch.js>/<startOrdersLoading>: Ordenes al estado: ',result )
        // dispatch( ordersLoading( result ) );
        dispatch( LoadOrdersSuccess( result ) );
        // TODO : UX para avisar al usuario de la carga de datos de ordenes
      });

      // orders.then((result) => {
      //   console.log( 'Ordenes al estado: ',result )
      //   dispatch( ordersLoading( result ) ); 
      // }).catch((err) => {
        
      // }); 
      // dispatch( ordersLoading( orders ) ); 
    }catch( err ){
      // TODO : UX Manejar el error cambiando el estado de ERRORES de forma sincronica
      console.log( '<orderFetch.js>/<startOrdersLoading>: No se pudo cargar la orden correctamente', err );
      dispatch( LoadOrdersError( 'Error en la carga de las ordenes' ) ); // TODO : Hacer un archivo separado con objeto de mensajes de errores. Y no hardcodear dichos mensajes
    }
  }
}