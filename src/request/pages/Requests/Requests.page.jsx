import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconCancel from '../../../shared/components/IconCancel/IconCancel';
// import IconDownload from '../../../shared/components/IconDownload/IconDownload';
import IconStop from '../../../shared/components/IconStop/IconStop';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import { startFormDataLoadingAntenna } from '../../actions/formData';
import { startLoadMeasurementSurface } from '../../actions/MeasurementSurfacesFetch';
import { sendNewOrderClean } from '../../actions/newOrder';
import { startOrdersLoading } from '../../actions/orderFetch';
import ReportDownload from '../../components/ReportDownload/ReportDownload';
import RequestTable from '../../components/RequestTable/RequestTable';
import RequestErrorDetail from '../../components/RequestErrorDetail/RequestErrorDetail';

// TODO : Mover a columns.js
const reportStatusIcon = ( status, pdfFileId, errorMsg ) => {
  switch ( status ) {
    case 'Procesando':
      return <IconStop title='Orden en proceso' />

    case 'Cancelado':
      // return <IconCancel />
      return <RequestErrorDetail errorMsg={ errorMsg } icon={ <IconCancel /> } /> 

    case 'Terminado':
      // TODO : Crear un componente que permita descargar el archivo. Usar Actions de Redux
      return <ReportDownload pdfFileId={ pdfFileId } />
  
    default:
      return <IconStop />
  }
};


// TODO : Separar en otro archivo
// tableData Mapea los datos de las ordenes de forma tal que le sirva a la tabla para acceder (columns.js)
const tableData = ( ordersClient = [ ] ) => {
  return ordersClient.map( orderClient => ({
    order_date: orderClient.date_order,
    base_name: orderClient.base_point.base_name,
    order_state: orderClient.state_order,
    order_detail: { 
      processingError: orderClient.processingError,
      base : {
        url_rinex: orderClient.base_point.url_rinex,
        antenna_height: orderClient.base_point.antenna_height,
        antenna_model: orderClient.base_point.antenna_model,
        antenna_type_height: orderClient.base_point.antenna_type_height,
        base_name: orderClient.base_point.base_name,
        measurementSurfaceId: orderClient.base_point.measurementSurfaceId,
      },
      moving_points:
        orderClient.mobile_points?.map( moving_point => (
          {
            url_rinex: moving_point.url_rinex,
            antenna_height: moving_point.antenna_height,
            antenna_model: moving_point.antenna_model,
            antenna_type_height: moving_point.antenna_type_height,
            base_name: moving_point.base_name,
          }
        )),
    },
    order_download: reportStatusIcon( orderClient.state_order, orderClient.pdfFileId, orderClient.processingError ), // TODO : cambiar el componente a columns.js. Que reciba solamente el state_order
    // order_download: {
    //   icon : reportStatusIcon( orderClient.state_order, orderClient.pdfFileId )
    //   processingError: orderClient.processingError,
    // },
  }));
};

const Requests = ( ) => {
  // console.log( '<Requests.js>/<Requests>: Requests' );

  const dispatch = useDispatch( );
  // TODO : Poner esta informacion de la tabla como props o como estado de Redux
  const [ table, setTable ] = useState( [ ] );
  const { data: ordersClient, loading, error } = useSelector( state => state.orders );

  useEffect( ( ) => {
    dispatch( sendNewOrderClean( ) )
  }, [ dispatch ] )

  // console.log( '<RequestNew.js>/<RequestNew>: RequestNew' );
  useEffect( ( ) => {
    dispatch( startFormDataLoadingAntenna( ) ); // TODO : Mover unos componentes mas arriba
    // dispatch( startOrdersLoading( ) );
  }, [ dispatch ] );

  useEffect( ( ) => {
    dispatch( startLoadMeasurementSurface( ) ); // TODO : Mover unos componentes mas arriba
    // dispatch( startOrdersLoading( ) );
  }, [ dispatch ] );
  
  // TODO : Decidir que debe estar en el Root de PrivateRoot
  //        * Los datos de las antenas deben estar en el Root
  //        * Las ordenes se deberan cargar cada vez que se llegue a este componente

  
  useEffect( ( ) => {
    // TODO : Hacer funciones que digan si esta o no la condicion de antennas y username
    // console.log( '<Requests.page.jsx>/<Request>: Evolucion de antennas con useEffect: ', antennas );

      dispatch( startOrdersLoading( ) );

  } , [ dispatch ] );


  useEffect( ( ) => {
    setTable( tableData( ordersClient ) );
  }, [ ordersClient ]);

  return (
    <div className='requests' >
      <div className='request-header' >
        <h3>Solicitudes de procesamiento</h3>

        <p>Listado de todas las solicitudes realizadas. Podrá ver el estado y descargar los informes de procesamiento de aquellas solicitudes finalizadas.</p>
        <hr/>
      </div>        

      <div className='request-container' >
        <h3>Solicitudes</h3>
        {/* TODO : Revisar el tema del error */}
        { loading ? <Spinner /> : <RequestTable data={ table } /> }
        { error &&  'Error al cargar las ordenes.' } 
      </div>
    </div>
  )
}

export default Requests
