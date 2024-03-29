import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { fetchFileConToken } from '../../../shared/helpers/fetch';


const AntennaDetail = ( { base_name, url_rinex, antenna_model, antenna_type_height, antenna_height, measurementSurface } ) => {
  // TODO : Separarlo como funcion para reutilizarla. 
  // TODO : Manejar ERORRES en caso que falle. Try catch al resolver la promesa. Si falla el renew, salir
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
        // console.log( '<AntennaDetail.jsx>/<AntennaDetail>: Error al abrir el pop-up de descarga del archivo', error );
        // TODO : Tratar error del download
      });
  };

  return (
    <div>
      <div>RINEX del punto { base_name }: 
      <span>   </span>
        <div className='icon-container icon-container--small'
          onClick={ ( ) => downloadHandle( url_rinex ) }
        >
          <FontAwesomeIcon icon={ faDownload } className='icon icon--small' />
        </div>
      </div> 

      <p>Modelo de antena: { antenna_model }</p>
      <p>Tipo de altura de antena: { antenna_type_height } </p>
      <p>Altura de antena: {antenna_height } </p>
      <p>Lugar de donde se midio la base: { measurementSurface }</p>
    </div>
  )
}

export default AntennaDetail;
