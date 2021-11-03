import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewOrderClean } from '../../actions/newOrder';

import styles from './styles.module.scss';

// TODO : Mejorar el estilo del componente.
const UserInfo = ( ) => {
  const dispatch = useDispatch( );

  useEffect( ( ) => {
    dispatch( sendNewOrderClean( ) )
  }, [ dispatch ] );

  const { firstname, lastname, username } = useSelector( state => state.auth.data );

  return (
    <div className='requests' >
      <div className='request-header' >
        <h3>Información del Usuario</h3>

        <p>Información del usuario en detalle</p>
        <hr/>
      </div>        

      <div className='request-container' >
        <h3>Info</h3>
        <div className='request-new__form' >
          <div className={ styles.row} >
            <p>Nombre: { firstname } </p>
          </div>
          <div className={ styles.row} >
            <p>Apellido: { lastname } </p>
          </div>
          <div className={ styles.row} >
            <p>Email: { username } </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
