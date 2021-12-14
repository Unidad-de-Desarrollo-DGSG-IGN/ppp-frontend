import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { faTable, faList } from '@fortawesome/free-solid-svg-icons';

import { sendNewOrderClean } from '../../actions/newOrder';
import styles from './styles.module.scss';

// TODO : Mejorar el estilo del componente.
const RequestNewSuccess = ( ) => {
  const dispatch = useDispatch( );

  useEffect( ( ) => {
    dispatch( sendNewOrderClean( ) )
  }, [ dispatch ] );

  return (
    <div className='requests' >
      <div className='request-header' >
        <h3>Solicitud</h3>

        {/* <p>Solitud realizada</p> */}
        <hr/>
      </div>        

      <div className='request-container request-container--column' >
        <div className='request-new__form request-new__form--success' >
        <h3>Solicitud generada correctamente</h3>
          <div className={ styles.row} >
            <p>
              El procesamiento ha comenzado y puede demorar algunos minutos. Le enviaremos desde la cuenta ppp@ign.gob.ar un correo electrónico con un reporte de los resultados una vez finalizado el mismo con éxito.
            </p>
          </div>
        </div>

        <div className='nav__options nav__options--column' >
          <NavLink className='navlink navlink' to='/requests/requests'>
            <FontAwesomeIcon icon={ faTable } className='icon' /> Solicitudes
          </NavLink>


          <NavLink className='navlink navlink' to='/requests/request-new'>
            <FontAwesomeIcon icon={ faList } className='icon' /> Nueva solicitud
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default RequestNewSuccess;
