import { v4 as uuidv4 } from 'uuid';
import { fetchSinToken } from '../../shared/helpers/fetch';
import { types } from './../../shared/types/types';


// Primary Actions

const sendRegister = ( ) => ({
  type: types.sendRegister,
});

const sendRegisterSuccess = ( msg ) => ({
  type: types.sendRegister_success,
  // 'Su registro ha sido exitoso. Le estara llegando un email para la verificacion de la cuenta.'
  payload: msg,
});

const sendRegisterError = ( msg ) => ({
  type: types.sendRegister_error,
  payload: msg,
});

export const sendRegisterClean = ( ) => ({
  type: types.sendRegister_clean,
});


// Async Actions

export const startSendRegister = ( dataForm ) => {
  return async( dispatch ) => {
    dispatch( sendRegister( ) );
    try{
      // Armando los datos a enviar con uuid
      const data = {
        ...dataForm,
        uuid : uuidv4( ),
      };

      // Envio de informacion al servidor
      const resp = await fetchSinToken( 
        'users', 
        { 
          email: data.email, 
          password: data.password, 
          firstname: data.name, 
          lastname: data.surname, 
          id: data.uuid,
        },
        'POST',
      );
      const body = await resp.json( );
      
      if( body?.status === 'success' ){
        let msg = 'El registro ha sido exitoso. En breve recibirá un correo electrónico para verificar su cuenta.';
        dispatch( sendRegisterSuccess( msg ) );
      }else{
        let errorMsg = 'Ha ocurrido un error en el registro de la cuenta.';
        dispatch( sendRegisterError( errorMsg ) );
      }

    }catch( err ){
      let errorMsg = 'Ha ocurrido un error en el registro de la cuenta.';
      dispatch( sendRegisterError( errorMsg ) );
    };
  };
};
