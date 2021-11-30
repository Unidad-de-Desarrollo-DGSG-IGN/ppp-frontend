import { fetchSinToken } from '../../shared/helpers/fetch';
import { types } from './../../shared/types/types';


// Primary Actions

const sendResetPassword = ( ) => ({
  type: types.sendResetPassword,
});

const sendResetPassword_success = ( msg ) => ({
  type: types.sendResetPassword_success,
  payload: msg,
});

const sendResetPassword_error = ( msg ) => ({
  type: types.sendResetPassword_error,
  payload: msg,
});

export const sendResetPassword_clean = ( ) => ({
  type: types.sendResetPassword_clean,
});


// Async Actions

export const startSendResetPassword = ( token, password ) => {
  return async( dispatch ) => {
    dispatch( sendResetPassword( ) );
    try{
      const resp = await fetchSinToken( 
        `auth/recovery-password/${ token }`,
        {
          password,
        },
        'POST',
      );
      const body = await resp.json( );
      
      if( body?.status === 'success' ){
        let msg = 'La contraseña se ha modificado correctamente';
        dispatch( sendResetPassword_success( msg ) );
      }else{
        let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su cuenta.';
        dispatch( sendResetPassword_error( errorMsg ) );
      }

    }catch( err ){
      let errorMsg = 'Ha ocurrido un error en el proceso para recuperar su cuenta.';
      dispatch( sendResetPassword_error( errorMsg ) );
      
    
    };
  };
};