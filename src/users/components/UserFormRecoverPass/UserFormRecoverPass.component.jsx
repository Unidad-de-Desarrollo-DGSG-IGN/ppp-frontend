import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';

const UserFormRecoverPass = ( { forms } ) => {
  const { register, handleSubmit, errors } = useForm( );
  const [ buttonSumitDisable, setButtonSumitDisable ] = useState( false );

  const handleForm = ( ) => {
    console.log('Recuperando contraseña!!!');
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

        <button type="submit" disabled={ buttonSumitDisable }>Cambiar contraseña</button>
      </form>
    </div>
  )
}

export default withData( null )( UserFormRecoverPass )
