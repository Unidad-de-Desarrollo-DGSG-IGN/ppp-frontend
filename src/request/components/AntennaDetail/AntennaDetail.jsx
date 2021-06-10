import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const AntennaDetail = ( { base_name, url_rinex, antenna_model, antenna_type_height, antenna_height } ) => {
  return (
    <div>
      {/* TODO : Poner url de descarga al logo */}
      <p>RINEX del punto { base_name }: 
        <div className='icon-container'>
          <FontAwesomeIcon icon={ faDownload } className='icon' />
        </div>
      </p> 
      <p>Modelo de antena: { antenna_model }</p>
      <p>Tipo de altura de antena: { antenna_type_height } </p>
      <p>Altura de antena: {antenna_height } </p>
    </div>
  )
}

export default AntennaDetail;
