import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';
import { startLogin } from '../../actions/auth';
import Spinner from '../../../shared/components/loadings/Spinner/Spinner';

const parameters = null;

const UserFormLogin = ( { forms } ) => {
  const dispatch = useDispatch( );
  const { loading, error } = useSelector( state => state.auth );

  const { register, handleSubmit, errors } = useForm( );

  const handleForm = ( { email, password } ) => {
    dispatch( startLogin( email, password ) );
  }

  return (
    <div>
      <form
        className='form--login'
        onSubmit={ handleSubmit( handleForm ) }
      >
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

        <button className={ loading ? 'btn btn--disabled' : 'btn' } type="submit" disabled={ loading }>Acceder</button>
      </form>

      { loading && <Spinner /> }
      { error && <p className='message__error'>{ error }</p> }
    </div>
  )
}

export default withData( parameters )( UserFormLogin )
