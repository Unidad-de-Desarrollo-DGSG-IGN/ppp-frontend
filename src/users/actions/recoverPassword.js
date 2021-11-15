import { fetchSinToken } from '../../shared/helpers/fetch';
import { types } from './../../shared/types/types';


// Primary Actions

const sendRecoverPassword = ( ) => ({
  type: types.sendRecoverPassword,
});

const sendRecoverPassword_success = ( msg ) => ({
  type: types.sendRecoverPassword_success,
  payload: msg,
});

const sendRecoverPassword_error = ( msg ) => ({
  type: types.sendRecoverPassword_error,
  payload: msg,
});

export const sendRecoverPassword_clean = ( ) => ({
  type: types.sendRecoverPassword_clean,
});


// Async Actions

export const startSendRecoverPassword = ( email ) => {
  return async( dispatch ) => {
    dispatch( sendRecoverPassword( ) );
    try{

      // TODO : Armar la URL para 
      const resp = await fetchSinToken( 
        `users/recover/${ email }`, // Fix URL
        null,
        'POST',
      );
      const body = await resp.json( );
      
      if( body?.status === 'success' ){
        let msg = 'Se ha enviado un correo electronico para recuperar su cuenta.';
        dispatch( sendRecoverPassword_success( msg ) );
      }else{
        let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su cuenta.';
        dispatch( sendRecoverPassword_error( errorMsg ) );
      }

    }catch( err ){
      let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su cuenta.';
      dispatch( sendRecoverPassword_error( errorMsg ) );
      
    
    };
  };
};