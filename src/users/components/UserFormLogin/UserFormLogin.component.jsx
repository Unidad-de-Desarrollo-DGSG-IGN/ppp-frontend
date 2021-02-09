import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';
import './UserFormLogin.style.css';

const parameters = null;

const UserFormLogin = ( { forms } ) => {
  const { register, handleSubmit, errors } = useForm( );
  const [ buttonSumitDisable, setButtonSumitDisable ] = useState( false );

  const handleForm = (  ) => {
    console.log('Usuario logueado!!!');
  }

  return (
    <div>
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

        <button type="submit" disabled={ buttonSumitDisable }>Acceder</button>
      </form>
    </div>
  )
}

export default withData( parameters )( UserFormLogin )
