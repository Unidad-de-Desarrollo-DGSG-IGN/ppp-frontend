import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { fetchSinToken } from '../../../helpers/fetch';
import UserFormInput from '../../../users/components/UserFormInput/UserFormInput.component';

import withData from './withData';

const parameters = '';

const RequestNewForm = ( { forms } ) => {
  const { handleSubmit, register, errors } = useForm( );

  useEffect( () => {
    // fetchSinToken( 'http://172.20.201.39/ppp-test/antennas' )
    //   .then( res => console.log(res) );
    fetch( 'http://172.20.201.39/ppp-test/antennas' )
      .then(res => res.json())
      .then(json => console.log(json));
  }, [])

  const handleForm = ( data ) => {
    console.log(data);
  }

  return (
    <div>
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
        <div>
         <label htmlFor='antenna'>Modelo de Antena</label>
          <select 
            name='antenna'
            ref={ register }
            errors={ errors}
            validation={
              {
                required: {
                  value : true,
                  message : "La modelo de antena es requisito"
                }
              }
            }
          >


          </select>
        </div>

        <button type="submit"> Registrar Solicitud </button>
      </form>

    </div>
  )
}

export default withData( parameters )( RequestNewForm );
