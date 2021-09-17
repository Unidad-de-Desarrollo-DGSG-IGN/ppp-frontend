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
  // TODO : usar el estado del Login para deshabilitar o no el boton de Login.
  const { loading, error } = useSelector( state => state.auth );

  const { register, handleSubmit, errors } = useForm( );

  const handleForm = ( { email, password } ) => {
    // TODO : Anclar que si se esta cargando, esta en modo Proceso, y no se puede realizar una operacion/accion como logout

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

      {/* { loading && <p>Servidor procesando</p> } */}
      { loading && <Spinner /> }
      { error && <p>{ error }</p> }
      {/* { data && <p>{ data }</p> }  */}
    </div>
  )
}

export default withData( parameters )( UserFormLogin )
