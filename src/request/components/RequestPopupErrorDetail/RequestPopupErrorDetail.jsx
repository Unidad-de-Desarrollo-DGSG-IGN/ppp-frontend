import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchSinToken } from '../../../shared/helpers/fetch';

const RequestPopupErrorDetail = ( { handleClose, errorMsg } ) => {

  const [ error, setError ] = useState( '' );

  useEffect( ( ) => {
    if( isNaN( errorMsg ) ){
      setError( errorMsg );
    }else{
      fetchSinToken( 'error-codes' )
      .then( errorRaw => errorRaw.json( ) )
      .then( errors =>  {
        console.log(errorMsg)
        console.log(errors.data.errors.find( errorCode => errorCode.code === errorMsg )?.description)
        setError( errors.data.errors.find( errorCode => errorCode.code === errorMsg )?.description );
      } );
    }
    
  }, [ errorMsg ] );
  
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

        { ErrorSection( error ) }

      </div>
    </div>
  )
}

export default RequestPopupErrorDetail;
