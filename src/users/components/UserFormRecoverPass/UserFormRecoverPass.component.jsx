import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import { startSendRecoverPassword } from '../../actions/recoverPassword';
import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';

const UserFormRecoverPass = ( { forms } ) => {
  const dispatch = useDispatch( );
  const { loading, data, error } = useSelector(state => state.recoverPassword );
  const { register, handleSubmit, errors } = useForm( );

  const handleForm = async ( data ) => {
    dispatch( startSendRecoverPassword( data.email ) );
  };

  return (
    <div>
      <form
        className='form--recover'
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

        <button className={ loading ? 'btn btn--disabled' : 'btn' } type="submit" disabled={ loading }>Cambiar contraseña</button>
      </form>

      { loading && <Spinner /> }
      { error && <p className='message__error'>{ error }</p> }
      { data && <p className='message__success'>{ data }</p> }
    </div>
  )
}

export default withData( null )( UserFormRecoverPass )
