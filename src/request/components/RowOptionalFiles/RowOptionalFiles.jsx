import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import UserFormInput from '../../../users/components/UserFormInput/UserFormInput.component';

// TODO : Manejar los errores locales de los inputs
const RowOptionalFiles = ( { opcional, setOpcionales, register, errors, antennas, watch } ) => {
  return (
    <tr>
      <th>
        <input
          type='file'
          placeholder='Subir archivo principal'
          name={ `file-opt-${ opcional }` }
          ref={ register( {
            required: {
              value : true,
              message : "El archivo del punto móvil de la antena es requisito"
            },
          } ) }
          // errors={ errors }
        />
      </th>

      <th>
        <input
          type='text'
          placeholder='Nombre'
          name={ `name-moving-${ opcional }` } // se tiene generar con 
          ref={ register }
          // errors={ errors }
        />
      </th>

      <th>
        <select 
          name={ `antennaModel-opt-${ opcional }` }
          ref={ register }
          errors={ errors }
          validation={
            {
              required: {
                value : true,
                message : "El modelo de antena es requisito"
              }
            }
          }
        >
          {
            antennas.map( antenna => 
                <option key={ antenna.id }>{ antenna.name }</option>
            )
          }
        </select>
      </th>

      <th>
        <select
          name={ `antennaTypeHeight-opt-${ opcional }` }
          ref={ register }
          errors={ errors }
          validation={
            {
              required: {
                value : true,
                message : "El tipo de antena es requisito"
              }
            }
          }
        >
          {
            antennas.find( antenna => antenna.name === watch( `antennaModel-opt-${ opcional }` ) )?.height_types.map( height => 
                <option key={height.id}>{ height.name }</option>
            )
          }
        </select>
      </th>

      <th>
        <input
          type='number'
          name={ `antennaHeight-opt-${ opcional }` }
          ref={ register }
          // errors={ errors }
        />
      </th>

      <th>
        <div 
          className='icon-container icon-container--red'
          onClick={ () => {
            setOpcionales( opt => opt.filter( value => value !== opcional  ) )
          } }
        >
          <FontAwesomeIcon icon={ faTrash } className='icon' />
        </div>
      </th>
    </tr>
  );
};

export default RowOptionalFiles;
