import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import { sendRecoverPassword_clean, startSendRecoverPassword } from '../../actions/recoverPassword';
import UserFormInput from '../UserFormInput/UserFormInput.component';
import withData from './withData';

const UserFormRecoverPass = ( { forms } ) => {
  const dispatch = useDispatch( );
  const { loading, data, error } = useSelector(state => state.recoverPassword );
  const { register, handleSubmit, errors } = useForm( );

  const handleForm = async ( ) => {
    dispatch( sendRecoverPassword_clean( ) ); // TODO : Donde limpiar?
    dispatch( startSendRecoverPassword( ) );
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

      {/* { loading && <p>Servidor procesando</p> } */}
      { loading && <Spinner /> }
      { error && <p>{ error }</p> }
      { data && <p>{ data }</p> }
    </div>
  )
}

export default withData( null )( UserFormRecoverPass )
