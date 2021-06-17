import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startFormDataLoadingAntenna } from '../../actions/formData';
import { startOrdersLoading } from '../../actions/orderFetch';
import RequestTable from '../../components/RequestTable/RequestTable';


// TODO : Separar en otro archivo
const tableData = ( ordersClient = [ ] ) => {
  return ordersClient.map( orderClient => ({
    order_date: orderClient.date_order,
    base_name: orderClient.base_point.base_name,
    order_state: orderClient.state_order,
    order_detail: { 
      base : {
        url_rinex: orderClient.base_point.url_rinex,
        antenna_height: orderClient.base_point.antenna_height,
        antenna_model: orderClient.base_point.antenna_model,
        antenna_type_height: orderClient.base_point.antenna_type_height,
        base_name: orderClient.base_point.base_name,
      },
      moving_points:
        orderClient.mobile_points.map( moving_point => (
          {
            url_rinex: moving_point.url_rinex,
            antenna_height: moving_point.antenna_height,
            antenna_model: moving_point.antenna_model,
            antenna_type_height: moving_point.antenna_type_height,
            base_name: moving_point.base_name,
          }
        )),
    },
    order_download: 'download', // TODO : Poner link
  }));
};

const Requests = ( ) => {
  const dispatch = useDispatch( );
  const [table, setTable] = useState( [ ] );
  const { ordersClient } = useSelector( state => state.orders );
  console.log( 'Ordenes : ', ordersClient );
  
  useEffect( ( ) => {
    dispatch( startFormDataLoadingAntenna( ) );
  }, [ dispatch ] );
  
  useEffect( ( ) => {
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
        <RequestTable data={ table } />
      </div>
    </div>
  )
}

export default Requests
