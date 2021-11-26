import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons'; // faUpload

import UserFormInput from '../../../users/components/UserFormInput/UserFormInput.component';
// import RequestNewFormOptionalFiles from '../RequestNewFormOptionalFiles/RequestNewFormOptionalFiles';

import withData from './withData';
import { startSendNewOrder } from '../../actions/newOrder';
import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import { startFormDataLoadingAntenna } from '../../actions/formData';
import AntennaModelInput from '../AntennaModelInput/AntennaModelInput';

const parameters = ''; // Parametros que pueden servir para la composicion de componentes


const RequestNewForm = ( { forms } ) => {
  const { handleSubmit, register, errors, watch, setError, control } = useForm({
    defaultValues: {antennaModel: ''}
  });
  // const [ hide, setHide ] = useState( true );
  // let contadorValorInicial = 1;
  // const [contador, setContador] = useState( contadorValorInicial );
  // const [opcionales, setOpcionales] = useState( [ ] );
  
  const [ opcionales ] = useState( [ ] );
  
  const dispatch = useDispatch( );
  const { antennas } = useSelector( state => state.formsData );
  const { loading, error, data } = useSelector( state => state.newOrder );
  
  useEffect( ( ) => {
    dispatch( startFormDataLoadingAntenna( ) );
  }, [dispatch] );
  
  const handleForm = async ( data ) => {
    dispatch( startSendNewOrder( data, opcionales ) );
    // console.log( 'Datos del formulario: ', data);
  }
  

  return (
    <div className='request-new__form' >
      <h2>Datos de la BASE para el procesamiento PPP</h2>

      <form onSubmit={ handleSubmit( handleForm ) }>
      <div className='form__row'>
          <label htmlFor='file'>Archivo de observación RINEX del punto BASE (los formatos aceptados son: .Z, .??d, .??o). Tamaño máximo permitido 20MB.</label>
          <input 
            type='file'
            name='file'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "El archivo del punto BASE de la antena es requisito"
                },
              }
            )}
            errors={ errors }
            onChange={ e => {
              console.log(e.target.files[0].size);
              let archivo_limite_mb = 20 // TODO : Consultar a una api el valor limite del archivo
              if( e.target.files[0].size >= 1048576 * archivo_limite_mb ){ 
                console.log('Te pasaste!');
                setError(
                  'file',
                  {
                    type: 'manual',
                    message: `Tamaño de archivo excedido. Limite ${archivo_limite_mb} mb.`
                  }
                )
              }
            }}
          />
          { errors['file'] && <div> <p className='form__error'> {errors['file'].message} </p> </div> }
        </div>


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

        {/* // TODO : Refactorizar en with data */}
        {/* <div className='form__row'>
         <label htmlFor='antennaModel'>Modelo de Antena</label>
          <select 
            name='antennaModel'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "El modelo de antena es requisito"
                }
              }
            )}
            errors={ errors }
          >
            {
              antennas.map( antenna => 
                 <option key={antenna.id}>{ `${antenna.name.replace(/ /g, "\u00a0")}` }</option>
              )
            }
          </select>
          { errors['antennaModel'] && <div> <p className='form__error'> {errors['antennaModel'].message} </p> </div> }
        </div> */}

        <AntennaModelInput errors={ errors } antennas={ antennas } control={ control }  />

        <div className='form__row'>
          <label htmlFor='antennaTypeHeight'>Tipo de altura de antena</label>
          <select 
            name='antennaTypeHeight'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "El tipo de altura de antena es requisito"
                }
              }
            )}
            errors={ errors }
          >
            {
              antennas.find( antenna => antenna.name.replace(/ /g, "\u00a0") === watch("antennaModel").value )?.height_types.map( height => 
                 <option key={ height.id }>{ height.name }</option>
              )
            }
          </select>
          { errors['antennaTypeHeight'] && <div> <p className='form__error'> {errors['antennaTypeHeight'].message} </p> </div> }
        </div>

        <div className='form__row'>
          <label htmlFor='antennaHeight'>Altura de antena [m]</label>
          <input 
            type='number'
            step='.001'
            name='antennaHeight'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "La altura de la antena es requisito"
                }
              }
            )}
            errors={ errors }
          />
          { errors['antennaHeight'] && <div> <p className='form__error'> {errors['antennaHeight'].message} </p> </div> }
        </div>

        <br/>

        {/* <div 
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

        </div> */}

        {/* <hr /> */}

        <div className='form__row form__row--agree'>
          <label htmlFor='antennaHeight'>Acepto que los resultados del procesamiento puedan ser utilizados por el IGN para la evaluación de productos y servicios cartográficos y/o geodésicos.</label>
          <input 
            type='checkbox'
            name='agree'
            ref={ register( {
              required: {
                value : true,
                message : "Aceptar el uso de archivos por parte del IGN es requisito"
              }
            } ) }
            errors={ errors }
          />
          { errors['agree'] && <div> <p className='form__error'> {errors['agree'].message} </p> </div> }
        </div>

        <button className={ loading ? 'btn btn--disabled' : 'btn' } type="submit" disabled={ loading } > Registrar Solicitud </button>
        
        <br/>
      </form>

      { loading && <Spinner /> }
      { error && <p className='message__error'>{ error }</p> }
      { data && <p className='message__success'>{ data }</p> }

    </div>
  )
}

export default withData( parameters )( RequestNewForm );
