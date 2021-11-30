import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrderDetailClean, startLoadOrderDetail } from '../../actions/orderDetail';

import AntennaDetail from '../AntennaDetail/AntennaDetail';

const RequestPopupDetail = ( { handleClose, data } ) => {
  // const MOVING_POINTS_CANTIDAD_NULA = 0 ;
  const dispatch = useDispatch( );
  const orderDetail = useSelector( state => state.orderDetail );
  console.log( 'Order detail: ', orderDetail );

  // console.log( 'popup moving points', data.moving_points );
  // TODO : Crear un CustomHook que mapee "data" con datos matcheables procesados
  //        * En particular que matchee modelo de antena y tipo de altura de antena

  useEffect( ( ) => {
    dispatch( startLoadOrderDetail( data ) );

    return ( ) => {
      dispatch( loadOrderDetailClean( ) );
    }
  }, [ dispatch, data ] );

  const error = ( data ) => {
    return(
      <>
        <h4>Error</h4>
        <p>{data?.processingError}</p>
      </>
    );
  };

  return (
    <div className="popup-box" >
      <div className="box">
        <span className="close-icon" onClick={ handleClose }>x</span>
        <div>
          <h4>Punto Base</h4>
          {
            orderDetail.loading 
              ? 'Cargando detalles de la solicitud...' 
              : <AntennaDetail { ...orderDetail.data } /> 
          }
        </div>

        <hr />

        {
          data.processingError 
            ? error( data )
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
