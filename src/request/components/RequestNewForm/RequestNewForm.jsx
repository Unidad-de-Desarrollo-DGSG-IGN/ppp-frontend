import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { fetchConToken, fetchFileConToken } from '../../../helpers/fetch';
import UserFormInput from '../../../users/components/UserFormInput/UserFormInput.component';
import { startFormDataLoadingAntenna } from '../../actions/formData';

import withData from './withData';

const parameters = '';

const RequestNewForm = ( { forms } ) => {
  const { handleSubmit, register, errors, watch } = useForm( );
  const { antennas } = useSelector( state => state.formsData )
  const dispatch = useDispatch();

  useEffect( ( ) => {
    dispatch( startFormDataLoadingAntenna() );
  }, [ dispatch ] );

  const handleForm = async ( data ) => {
    console.log( 'Datos del formulario', data );

    const formData = new FormData();
    formData.append('file', data.file[0]);
    const id = uuidv4();
    formData.append('id', id );

    const res = await fetchFileConToken( 'files', formData, 'POST' );
    const resJson = await res.json();
    console.log( 'Respuesta del archivo enviado: ', resJson );

    if( resJson.status === 'success' ){
      console.log('Perfecto');

      const antenna = antennas.find( antenna => antenna.name === data.antennaModel );
      const height_type = antenna.height_types.find( height_type => height_type.name === data.antennaTypeHeight ).id;
      
      const order = {
        id,
        fileId: id,
        name: data.name_base,
        antennaId: antenna.id,
        antennaHeightTypeId: height_type,
        height: data.antennaHeight,
      }

      console.log(order);
      const resOrder = await fetchConToken( 'orders', 
      order, 
      'POST',      
      );
      const resOrderJson = await resOrder.json();
      console.log( resOrderJson );
    }

  }

  // console.log( antennas );
  // console.log( watch("antennaModel") );
  // console.log( antennas.find( antenna => antenna.name === watch("antennaModel") )?.height_types );

  return (
    <div className='request-new__form' >
      <h2>Datos de la BASE para el procesamiento PPP</h2>

      <form onSubmit={ handleSubmit( handleForm ) }>
        { forms.map( form => 
            
            <UserFormInput 
              label={ form.label }
              type={ form.type }
              placeholder={ form.placeholder }
              name={ form.name }
              register={ register }
              errors={ errors }
              validation={ form.validation }
              key={ form.name }
            />
        
          ) 
        }

        {/* // Refactorizar en with data */}
        <div className='form__row'>
         <label htmlFor='antennaModel'>Modelo de Antena</label>
          <select 
            name='antennaModel'
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
                 <option key={antenna.id}>{ antenna.name }</option>
              )
            }
          </select>
        </div>


        <div className='form__row'>
          <label htmlFor='antennaTypeHeight'>Tipo de altura de antena</label>
          <select 
            name='antennaTypeHeight'
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
              antennas.find( antenna => antenna.name === watch("antennaModel") )?.height_types.map( height => 
                 <option key={height.id}>{ height.name }</option>
              )
            }
          </select>
        </div>

        <div className='form__row'>
          <label htmlFor='antennaHeight'>Altura de antena [m]</label>
          <input 
            type='number'
            name='antennaHeight'
            ref={ register }
            errors={ errors }
            validation={
              {
                required: {
                  value : true,
                  message : "La altura de la antena es requisito"
                }
              }
            }
          />
        </div>


        <button type="submit"> Registrar Solicitud </button>
      </form>

    </div>
  )
}

export default withData( parameters )( RequestNewForm );
