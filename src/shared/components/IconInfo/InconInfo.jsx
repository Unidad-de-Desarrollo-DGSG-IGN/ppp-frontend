import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';
import { fetchFileConToken } from '../../helpers/fetch';

const InconInfo = ( { size = 4, url }  ) => {

  // TODO : Icono para DOWNLOAD
  const downloadHandle = ( url ) => {
    fetchFileConToken( `files/${ url }` )
      .then( ( response ) => {
        response.blob( ).then( ( blob ) => {
          let url = window.URL.createObjectURL( blob );
          let a = document.createElement( 'a' );
          a.href = url;
          a.download = response.headers.get( 'Content-Disposition' ).replaceAll( '"', '' ).split( '=' )[ 1 ];
          a.click( );
        })
      }).catch( ( error ) => {
        console.log( '<AntennaDetail.jsx>/<AntennaDetail>: Error al abrir el pop-up de descarga del archivo', error );
      });
  };


  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
      onClick={ ( ) => downloadHandle( url ) }
    >
      <FontAwesomeIcon 
        icon={ faInfoCircle } 
        className={ styles.icon }
      />
    </div>
  );
};

export default InconInfo;
