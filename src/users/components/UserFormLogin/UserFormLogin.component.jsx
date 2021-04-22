import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';
import './UserFormLogin.style.css';
import { startLogin } from '../../actions/auth';
// import { startFormDataLoadingAntenna } from '../../../request/actions/formData';

const parameters = null;

const UserFormLogin = ( { forms } ) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm( );
  const [ buttonSumitDisable ] = useState( false );

  const handleForm = async( { email, password } ) => {
    // setButtonSumitDisable( true );
    await dispatch( startLogin( email, password ) );
    // setButtonSumitDisable( false ); // TODO : Revisar tema de optimizacion
    // TODO : Aca pedir las antenas
    // dispatch( startFormDataLoadingAntenna( ) );
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

        <button className={ buttonSumitDisable ? 'btn btn--disabled' : 'btn'} type="submit" disabled={ buttonSumitDisable }>Acceder</button>
      </form>
    </div>
  )
}

export default withData( parameters )( UserFormLogin )
