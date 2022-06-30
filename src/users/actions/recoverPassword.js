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
      const resp = await fetchSinToken( 
        `auth/recovery-password`,
        {
          email: email,
        },
        'POST',
      );
      const body = await resp.json( );
      
      if( body?.status === 'success' ){
        let msg = 'Se ha enviado un correo electrónico para restablecer su contraseña. Si no recibe el correo, revise la casilla de spam.';
        dispatch( sendRecoverPassword_success( msg ) );
      }else{
        let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su contraseña.';
        dispatch( sendRecoverPassword_error( errorMsg ) );
      }

    }catch( err ){
      let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su contraseña.';
      dispatch( sendRecoverPassword_error( errorMsg ) );
    };
  };
};