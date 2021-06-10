import React from 'react';
import AntennaDetail from '../AntennaDetail/AntennaDetail';

const RequestPopupDetail = ( { handleClose, data } ) => {
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
          {/* TODO : mapeo del arreglo de los puntos moviles con el componente AntennaDetail */}
          <AntennaDetail
            { ...data.base }
          />
        </div>
      </div>
    </div>
  )
}

export default RequestPopupDetail;
