import { fetchSinToken } from '../../shared/helpers/fetch';
import { types } from './../../shared/types/types';


// Primary Actions

const sendRegisterVerification = ( ) => ({
  type: types.sendVerification,
});

const sendRegisterVerificationSuccess = ( msg ) => ({
  type: types.sendVerification_success,
  payload: msg,
});

const sendRegisterVerificationError = ( msg ) => ({
  type: types.sendVerification_error,
  payload: msg,
});

export const sendRegisterVerificationClean = ( ) => ({
  type: types.sendVerification_clean,
});


// Async Actions

export const startSendRegisterVerification = ( token ) => {
  return async( dispatch ) => {
    dispatch( sendRegisterVerification( ) );
    try{

      const resp = await fetchSinToken( 
        `users/verify/${ token }`,
        null,
        'POST',
      );
      const body = await resp.json( );
      
      if( body?.status === 'success' ){
        let msg = 'Su cuenta ha sido registrada satisfactoriamente.';
        dispatch( sendRegisterVerificationSuccess( msg ) );

        setTimeout( ( ) => {
          dispatch( sendRegisterVerificationClean( ) )
        },
          3000
        );
      }else{
        let errorMsg = 'Ha ocurrido un error en el verificación de la cuenta.';
        dispatch( sendRegisterVerificationError( errorMsg ) );

        setTimeout( ( ) => {
          dispatch( sendRegisterVerificationClean( ) )
        },
          3000
        );
      }

    }catch( err ){
      let errorMsg = 'Ha ocurrido un error en el verificación de la cuenta.';
      dispatch( sendRegisterVerificationError( errorMsg ) );

      setTimeout( ( ) => {
        dispatch( sendRegisterVerificationClean( ) )
      },
        3000
      );
    };
  };
};
