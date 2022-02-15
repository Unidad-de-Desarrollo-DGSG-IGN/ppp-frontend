import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinToken } from '../../../shared/helpers/fetch';
import { loadOrderDetailClean, startLoadOrderDetail } from '../../actions/orderDetail';

import AntennaDetail from '../AntennaDetail/AntennaDetail';

const RequestPopupDetail = ( { handleClose, data } ) => {
  // const MOVING_POINTS_CANTIDAD_NULA = 0 ;
  const dispatch = useDispatch( );
  const orderDetail = useSelector( state => state.orderDetail );
  const [error, setError] = useState( '' );
  // console.log( 'Order detail: ', orderDetail );

  // console.log( 'popup moving points', data.moving_points );
  // TODO : Crear un CustomHook que mapee "data" con datos matcheables procesados
  //        * En particular que matchee modelo de antena y tipo de altura de antena

  useEffect( ( ) => {
    dispatch( startLoadOrderDetail( data ) );

    return ( ) => {
      dispatch( loadOrderDetailClean( ) );
    }
  }, [ dispatch, data ] );

  useEffect( ( ) => {
    if( isNaN( data?.processingError ) ){
      setError( data?.processingError );
    }else{
      fetchSinToken( 'error-codes' )
      .then( errorRaw => errorRaw.json( ) )
      .then( errors =>  {
        console.log(data?.processingError)
        console.log(errors.data.errors.find( errorCode => errorCode.code === data?.processingError )?.description)
        setError( errors.data.errors.find( errorCode => errorCode.code === data?.processingError )?.description );
      } );
    }
    
  }, [ data?.processingError ] );

  const ErrorSection = ( error ) => {
    return(
      <>
        <h4>Motivo de cancelación de la solicitud</h4>
        <p>{ error }</p>
      </>
    );
  };

  return (
    <div className="popup-box" >
      <div className="box">
        <span className="close-icon" onClick={ handleClose }>x</span>
        <div>
          <h4>Punto BASE</h4>
          {
            orderDetail.loading 
              ? 'Cargando detalles de la solicitud...' 
              : <AntennaDetail { ...orderDetail.data } /> 
          }
        </div>

        <hr />

        {
          data.processingError 
            ? ErrorSection( error )
            : null
        }

        {/* TODO : Comentar los puntos moviles hasta que se desarrolle tal analisis */}
        {/* <div> 
          <h4>Puntos Móviles</h4>
          {
            ( data.moving_points?.length === MOVING_POINTS_CANTIDAD_NULA || !data.moving_points ) && <p>No hay puntos moviles</p>
          }
          {
            data.moving_points?.map( moving_point => <AntennaDetail  key={ moving_point.id } {...moving_point} />)
          }
        </div> */}

      </div>
    </div>
  )
}

export default RequestPopupDetail;
