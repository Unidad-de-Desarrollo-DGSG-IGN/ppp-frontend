import { v4 as uuidv4 } from 'uuid';

import { types } from "../../shared/types/types";
import { fetchConToken, fetchFileConToken, fetchSinToken } from '../../shared/helpers/fetch';
import { startLogout } from '../../users/actions/auth';


const sendNewOrder = ( ) => ({
  type: types.sendOrder,
});


const sendNewOrderSuccess = ( info ) => ({
  type: types.sendOrder_success,
  payload: info,
});


const sendNewOrderError = ( error ) => ({
  type: types.sendOrder_error,
  payload: error,
});


export const newOrderLogout = ( ) => ({
  type: types.sendOrder_logout,
});


export const sendNewOrderClean = ( ) => ({
  type: types.sendOrder_clean,
});


export const startSendNewOrder = ( data, opcionales ) => {
  console.log( 'Data antenna model: ', data.antennaModel.value );
  // TODO : Hacer acciones con THUNK
  return async( dispatch, getState ) => {
    dispatch( sendNewOrder( ) );

    // TODO : Contemplar que si hay algun error, manejarlo
    try{
      console.log( '<RequestNewForm.jsx>/<handleForm> : Datos del formulario', data );
      const { username }  = getState( ).auth.data;
      // const { data: antennas }  = getState( ).formsData; // TODO : Guardar antennas en data, y no en antennas.
      const { antennas }  = getState( ).formsData;

      // Archivo Principal - envio de archivo
      const formData = new FormData( );
      let indicePrimerElementoFile = 0;
      formData.append( 'file', data.file[ indicePrimerElementoFile ] );
      const id = uuidv4( );
      formData.append( 'id', id );
  
      // const res = await fetchFileConToken( 'files', username, formData, 'POST' );
      const res = await fetchFileConToken( 'files', formData, 'POST' );
      const resJson = await res.json( );
      console.log( '<RequestNewForm.jsx>/<handleForm> : Respuesta del archivo principal enviado: ', resJson );
      const isSendFileSuccess = resJson.status;
  
      // Moving Points - Armado base de movingPoints y envio de archivos
      // TODO : Generar el ID para el archivo MAIN y luego pasarlo a los moving points. Ver si no hay movingPoints, lista vacia.
      // TODO : Separar en una funcion.
      const movingPoints = opcionales.map( ( opc ) => ({
        name : data[`name-moving-${ opc }`],
        antennaModel : data[`antennaModel-opt-${ opc }`], // TODO : .value
        antennaTypeHeight : data[`antennaTypeHeight-opt-${ opc }`],
        antennaHeight : data[`antennaHeight-opt-${ opc }`],
        // TODO : generar ID general?
        file: data[`file-opt-${ opc }`],
      }) );
  
      // console.log( '<RequestNewForm.jsx>/<handleForm> : Moving points: ', movingPoints );
  
      const movingPointsIdList = await movingPointsId( movingPoints );
      // console.log( '<RequestNewForm.jsx>/<handleForm> : Moivng Points IDs ', movingPointsIdList );
  
      // TODO : Enviar archivo principal y opcionales
      // TODO : Si los envios de archivos salen bien, enviar las ordenes con los datos
  
      movingPointsIdList.forEach( async( movingPoint ) => {
        // console.log(movingPoint.file);
        // console.log(movingPoint.fileId);
  
        // TODO : Hacer funcion de envio de archivo
        const formData = new FormData( );
        formData.append( 'file', movingPoint.file );
        formData.append( 'id', movingPoint.fileId );
  
        // const res = await fetchFileConToken( 'files', username, formData, 'POST' );
        const res = await fetchFileConToken( 'files', formData, 'POST' );

        if( res.message === 'renew invalid' ){
          dispatch( startLogout( ) );
        }

        const resJson = await res.json( );
        console.log( '<RequestNewForm.jsx>/<handleForm> : Respuesta del archivo optativo enviado: ', resJson );
        // TODO : Pensar como ver el caso en que no se envie correctamente algun archivo. Y no deje realizar las ordenes.
      });
  
  
      // Orden Completa
      if( isSendFileSuccess === 'success' ){  
        console.log( 'Data antenna model: ', data.antennaModel.value );
        // console.log( 'Antennas: ',antennas );
        const antenna = antennas.find( antenna => antenna.name.replace(/ /g, "\u00a0") === data.antennaModel.value.replace(/ /g, "\u00a0") );
        console.log( 'Antenna a enviar: ',antenna );
        const height_type = antenna.height_types.find( height_type => height_type.name === data.antennaTypeHeight )?.id;
        
        const order = {
          id,
          fileId: id,
          name: data.name_base,
          antennaId: antenna.id,
          antennaHeightTypeId: height_type,
          height: data.antennaHeight,
          // TODO : // Armar funcion que devuelva la lista de optativos listos
          movingPoints: movingPointsIdList.map( movingPoint => ({ 
            id: movingPoint.id,
            fileId: movingPoint.fileId,
            name: movingPoint.name,
            antennaId: movingPoint.antennaId,
            antennaHeightTypeId: movingPoint.antennaHeightTypeId,
            height: movingPoint.height,
          })),
        }
  
        // console.log( '<RequestNewForm.jsx>/<handleForm> : Orden a  enviar: ', order );
        const resOrder = await fetchConToken( 'orders', username, order, 'POST' ); // TODO : Falta enviar username
        const resOrderJson = await resOrder.json( );
        console.log( '<RequestNewForm.jsx>/<handleForm> : Respuesta al enviar una orden', resOrder );
        console.log( '<RequestNewForm.jsx>/<handleForm> : Respuesta al enviar una orden', resOrderJson );
        // TODO: manejar la respuesta de las ordenes
        // Verificar respuesta
        // if( resOrderJson?.status === 'success' ){
        if( resOrder.status === 201 || resOrderJson?.status === 'success' ){
          let msgSuccess = 'Orden enviada';
          dispatch( sendNewOrderSuccess( msgSuccess ) );

          // setTimeout( ( ) => {
          //   dispatch( sendNewOrderClean( ) )
          // },
          //   3000
          // );
        }else{
          let msgError = 'Error al crear una nueva orden';
          dispatch( sendNewOrderError( msgError ) );

          // setTimeout( ( ) => {
          //   dispatch( sendNewOrderClean( ) )
          // },
          //   3000
          // );
        }

        // TODO : Repensar que poner en payload para la orden enviada.
        // dispatch( sendNewOrderSuccess( 'Orden enviada' ) );
      }
      
    } catch( err ){
      console.log( '<newOrder.js>/<startSendNewOrder> : Error al enviar ordenes: ', err );
      // TODO : Manejar errores con Redux
      let msgError = 'Error al crear una nueva orden';
      dispatch( sendNewOrderError( msgError ) );

      // setTimeout( ( ) => {
      //   dispatch( sendNewOrderClean( ) )
      // },
      //   3000
      // );
    }
  }
}




// HELPERS
// TODO : Separar funciones en otro archivo para poder reutilizarlas
// TODO : Revisar las funciones en caso que sucedan errores
// TODO : Hacer test de las funciones

/**
 * Funcion que se encarga de traer el listado de antennas y su respectiva informacion.
 * No recibe parametros.
 * Devuelve El listano de antennas. 
 * TODO : Atajar el caso en donde no se pueda solicitar las antennas. Manejar los errores.
 * @returns {object[]} antennas
 */
 const antennasList = async( ) => {
  // TODO : Tomar info de antennas desde el STORE
  const res = await fetchSinToken( 'antennas' );
  const dataJson = await res.json( );
  return dataJson.data.antennas;
}

/**
 * Funcion que devuelve el ID de la antenna.
 * Recibe el listado de las antennas, y el modelo de la antenna.
 * Devuelve el correspondiente ID de la antenna.
 * TODO : Manejar errores. Que hacer si no se encuentra el id
 * @param {object[]} antennas 
 * @param {string} antennaModel 
 * @returns {string} id
 */
const antenna_id = ( antennas, antennaModel ) => {
  return antennas.find( antenna => antenna.name === antennaModel )?.id;
}

/**
 * Funcion que devuelve el correspondiente ID del HeightType de una antenna.
 * Recibe un listado de antennas, el modelo del TypeHeight de la antenna y el modelo de la antenna.
 * Devuelve el ID del HeightType de la antenna.
 * TODO : Manejar en caso de error.
 * @param {object[]} antennas 
 * @param {string} antennaTypeHeight 
 * @param {string} antennaModel 
 * @returns 
 */
const antennaHeightType_id = ( antennas, antennaTypeHeight, antennaModel ) => {
  const antenna = antennas.find( antenna => antenna.name === antennaModel );
  return antenna.height_types.find( height_type => height_type.name === antennaTypeHeight )?.id;
}

/**
 * Funcion que procesa los movingPoints añadiendole informacion extra.
 * Recibe los movingPoints
 * Devuelve los movingPoints procesados.
 * @param {object[]} movingPoints 
 * @returns {object[]} movingPoints estructurado de una nueva forma
 */
const movingPointsId = async( movingPoints ) => {
  const antennas = await antennasList( );

  return movingPoints.map( movingPoint => ({
    // TODO : Desesctrucutrar, para conservar campo id
    name: movingPoint.name,
    antennaId:  antenna_id( antennas, movingPoint.antennaModel ),
    antennaHeightTypeId: antennaHeightType_id( antennas, movingPoint.antennaTypeHeight, movingPoint.antennaModel ),
    height: movingPoint.antennaHeight,
    file: movingPoint.file[ 0 ],
    fileId: uuidv4( ),
    id: uuidv4( ),
  }) );
}