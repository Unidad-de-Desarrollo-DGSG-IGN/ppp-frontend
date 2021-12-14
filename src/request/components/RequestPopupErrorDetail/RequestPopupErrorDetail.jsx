import React from 'react';

const RequestPopupErrorDetail = ( { handleClose, errorMsg } ) => {

  const ErrorSection = ( errorMsg ) => {
    return(
      <>
        <h4>Motivo de cancelación de la solicitud</h4>
        <p>{ errorMsg }</p>
      </>
    );
  };

  return (
    <div className="popup-box" >
      <div className="box">
        <span className="close-icon" onClick={ handleClose }>x</span>

        { ErrorSection( errorMsg ) }

      </div>
    </div>
  )
}

export default RequestPopupErrorDetail;
