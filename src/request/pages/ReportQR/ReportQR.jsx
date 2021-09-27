import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import UserNavigation from '../../../users/components/UserNavigation/UserNavigation.component.jsx';
import { startDownloadReport } from '../../actions/reportFetch';
// import { sendRegisterVerificationClean, startSendRegisterVerification } from '../../actions/verification';
// import UserNavigation from './../../../users/components/UserNavigation';

const ReportQR = ( ) => {
  const dispatch = useDispatch( );
  const { data, loading, error } = useSelector( state => state.registerVerification );

  console.log( '<UserVerification.js>/<UserVerification>: UserVerification' );
  const { code } = useParams( );
  console.log( 'Parametros: ', code );

  // const onSubmit = ( event ) => {
  //   event.preventDefault( );
  //   dispatch( sendRegisterVerificationClean( ) );
  //   dispatch( startSendRegisterVerification( code ) );

  //   // TODO : 
  //   //    * Redireccionar al Login luego.
  //   //    * Pensar si hay algun error. Se muestra el menu?.
  // }

  useEffect( ( ) => {
    // dispatch( sendRegisterVerificationClean( ) );
    // dispatch( startSendRegisterVerification( code ) );
    dispatch( startDownloadReport( code ) );
  }, [ code, dispatch ] );

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>Descarga de informe</h1>
        <hr />

        <p style={ { fontWeight: 'bold' } }>{ code }</p>
        {/* <form 
          className='form--login'
          onSubmit={ onSubmit }
        >
          <p style={ { fontWeight: 'bold' } }>{ code }</p>
          <button 
            className={ loading ? 'btn btn--disabled' :'btn'} 
            disabled={ loading }
          >
            Enviar código de verificación
          </button>
        </form> */}

        {/* { loading && <p>Servidor procesando</p> } */}
        { loading && <Spinner /> }
        { error && <p>{ error }</p> }
        { data && <p>{ data }</p> }

        <UserNavigation />
      </div>
    </div>
  )
}

export default ReportQR;
