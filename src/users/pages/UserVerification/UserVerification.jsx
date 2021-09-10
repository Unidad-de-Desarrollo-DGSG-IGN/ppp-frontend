import React from 'react';
import { useParams } from 'react-router-dom';

import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import UserNavigation from '../../components/UserNavigation/UserNavigation.component';

const UserVerification = ( ) => {
  console.log( '<UserVerification.js>/<UserVerification>: UserVerification' );
  const { code } = useParams( );
  console.log( 'Parametros: ', code );

  const onSubmit = ( event ) => {
    event.preventDefault( );

    console.log('TODO: Realizar accion de verificacion del usuario');
    // TODO : 
    //    * Reazlizar accion redux para verificar usuario. GET con fetchSinToken
    //        users/verify/${token}
    //        (POST)
    //    * Redireccionar al Login luego.
    //    * Pensar si hay algun error. Se muestra el menu?.
  }

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>Verificación</h1>
        <hr />
        <p>Verifique su email con el siguiente codigo.</p>

        <form 
          className='form--login'
          onSubmit={ onSubmit }
        >
          <input type="text" defaultValue={ code } />
          <button className='btn'>
            Enviar código de verificación
          </button>
        </form>


        {/* <UserNavigation /> */}
      </div>
    </div>
  )
}

export default UserVerification;
