import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import { sendRegisterVerificationClean, startSendRegisterVerification } from '../../actions/verification';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserVerification = ( ) => {
  const dispatch = useDispatch( );
  const { data, loading, error } = useSelector( state => state.registerVerification );

  const { code } = useParams( );

  useEffect( ( ) => {
    dispatch( sendRegisterVerificationClean( ) );
    dispatch( startSendRegisterVerification( code ) );
  }, [ code, dispatch ] );

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>Verificación</h1>
        <hr />

        { loading && <Spinner /> }
        { error && <p>{ error }</p> }
        { data && <p>{ data }</p> }

        <UserNavigation />
      </div>
    </div>
  )
}

export default UserVerification;
