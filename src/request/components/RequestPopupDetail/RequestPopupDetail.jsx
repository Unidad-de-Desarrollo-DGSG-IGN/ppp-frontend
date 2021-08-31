import React from 'react';

import AntennaDetail from '../AntennaDetail/AntennaDetail';

const RequestPopupDetail = ( { handleClose, data } ) => {
  const MOVING_POINTS_CANTIDAD_NULA = 0 ;
  // console.log( 'popup moving points', data.moving_points );
  return (
    <div className="popup-box" >
      <div className="box">
        <span className="close-icon" onClick={ handleClose }>x</span>
        <div>
          <h4>Punto Base</h4>
          <AntennaDetail
            { ...data.base }
          /> 
        </div>

        <hr />

        <div> 
          <h4>Puntos Móviles</h4>
          {
            (data.moving_points.length === MOVING_POINTS_CANTIDAD_NULA ) && <p>No hay puntos moviles</p>
          }
          {
            data.moving_points.map( moving_point => <AntennaDetail  key={ moving_point.id } {...moving_point} />)
          }
        </div>

      </div>
    </div>
  )
}

export default RequestPopupDetail;
