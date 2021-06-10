import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // faUpload

import { fetchConToken, fetchFileConToken } from '../../../helpers/fetch';
import UserFormInput from '../../../users/components/UserFormInput/UserFormInput.component';
import { startFormDataLoadingAntenna } from '../../actions/formData';
import RequestNewFormOptionalFiles from '../RequestNewFormOptionalFiles/RequestNewFormOptionalFiles';

import withData from './withData';

const parameters = '';

const RequestNewForm = ( { forms } ) => {
  const [ hide, setHide ] = useState( true );

  const { handleSubmit, register, errors, watch } = useForm( );
  const { antennas } = useSelector( state => state.formsData );
  const dispatch = useDispatch();

  const [opcionales, setOpcionales] = useState([]);
  const [contador, setContador] = useState(1);

  useEffect( ( ) => {
    dispatch( startFormDataLoadingAntenna( ) );
  }, [ dispatch ] );

  const handleForm = async ( data ) => {
    console.log( 'Datos del formulario', data );
    console.log( opcionales );
    console.log( data[`antennaHeight-opt-${ 1}`]  );
    console.log( opcionales.map( opc => data[`antennaHeight-opt-${ opc }`] ) );

    const movingPoints = opcionales.map( opc => ({
      // [`antennaHeight`] : null, // [`antennaHeight-opt-${ opc }`]
      [`antennaHeight`] : data[`antennaHeight-opt-${ opc }`],
      [`antennaModel`] : data[`antennaModel-opt-${ opc }`],
      [`antennaTypeHeight`] : data[`antennaTypeHeight-opt-${ opc }`],
      [`name`] : data[`name-moving-${ opc }`],
    }) );

    console.log( 'Moving points: ', movingPoints );
    // const formData = new FormData( );
    // formData.append( 'file', data.file[0] );
    // const id = uuidv4( );
    // formData.append( 'id', id );

    // const res = await fetchFileConToken( 'files', formData, 'POST' );
    // const resJson = await res.json( );
    // console.log( 'Respuesta del archivo enviado: ', resJson );

    // if( resJson.status === 'success' ){
    //   console.log('Perfecto');

    //   const antenna = antennas.find( antenna => antenna.name === data.antennaModel );
    //   const height_type = antenna.height_types.find( height_type => height_type.name === data.antennaTypeHeight )?.id;
      
    //   const order = {
    //     id,
    //     fileId: id,
    //     name: data.name_base,
    //     antennaId: antenna.id,
    //     antennaHeightTypeId: height_type,
    //     height: data.antennaHeight,
    //     movingPoints: [], // TODO : Armar funcion que devuelva los moving point armados
    //   }

    //   console.log(order);
    //   const resOrder = await fetchConToken( 'orders', 
    //   order, 
    //   'POST',      
    //   );
    //   const resOrderJson = await resOrder.json();
    //   console.log( resOrderJson );
    // }

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

        <div className='form__row form__row--agree'>
          <label htmlFor='antennaHeight'>Acepto que los resultados del procesamiento puedan ser utilizados por el IGN para la evaluación de productos y servicios cartográficos y/o geodésicos.</label>
          <input 
            type='checkbox'
            name='agree'
            ref={ register }
            errors={ errors }
            validation={
              {
                required: {
                  value : true,
                  message : "Aceptar el uso de archivos por parte del IGN es requisito"
                }
              }
            }
          />
        </div>

        <br/>

        <div 
          className='optional-form'
        >
          <h3
            onClick={ () => setHide( value => !value ) }
          >
            Añadir datos de uno o más puntos MÓVILES para procesamiento diferencial respecto de la BASE (opcional)

          </h3>

          <div className={ `${ hide ? 'hide' : ' '}` }>
            <p>Los archivos RINEX que se importen en esta sección se procesarán en forma relativa respecto de las coordenadas POSGAR07 resultantes de la BASE (no se utiliza PPP para la determinación de coordenadas en esta modalidad).</p>

            <div className='optional-form--upload'>
              <h4>Ingreso de un nuevo punto MÓVIL</h4>
              <p>Archivo de observación RINEX del punto MÓVIL (se procesará en forma diferencial al punto BASE) Los formatos aceptados son: .Z, .??d, .??o</p>

              {/* TODO : Ver como agregar estos archivos al  */}
              {/* <div>
                <input type='file' />
                <div>  */}
                  {/* TODO : Cuando se haga click, agregar al estado de opcionales */}
                  {/* <FontAwesomeIcon icon={ faUpload } className='icon' />
                  Confirmar archivo de punto móvil
                  </div>
                </div> */}
              <div>
                <p>
                  <span 
                    onClick={ () => { 
                      setContador( valor => valor + 1 );
                      setOpcionales( value => ( [ ...value, contador ] ) ) } }
                      className='icon-container'
                  >
                    <FontAwesomeIcon icon={ faPlus } className='icon' />
                  </span>
                Agregar punto móvil
                </p>
              </div>
            </div>

            <div className='optional-form--table'>
              <h4>Resumen de los archivos de los puntos MÓVILES ingresados</h4>
              <RequestNewFormOptionalFiles 
                register={ register }
                errors={ errors }
                antennas={ antennas }
                watch={ watch }
                opcionales={ opcionales }
                setOpcionales={ setOpcionales }
              />
            </div>
          </div>

        </div>

        <button className='btn' type="submit"> Registrar Solicitud </button>
        
        <br/>
      </form>

    </div>
  )
}

export default withData( parameters )( RequestNewForm );
