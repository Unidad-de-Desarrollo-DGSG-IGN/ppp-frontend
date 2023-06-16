import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import UserNavigation from '../../../users/components/UserNavigation/UserNavigation.component.jsx';
import UserFormInput from '../../components/UserFormInput/UserFormInput.component';
import { startSendResetPassword } from '../../actions/resetPassword';

const SetNewPassword = ( ) => {
  const dispatch = useDispatch( );
  const { register, handleSubmit, errors, watch } = useForm( );
  
  // TODO : usar el estado propio de reseteo de contraseña
  const { data, loading, error } = useSelector( state => state.resetPassword );
  const { code } = useParams( );
  
  // TODO : Preparar el submit para enviar el codigo: code
  const onSubmit = ( dataForm ) => {
    dispatch( startSendResetPassword( code, dataForm.password ) );
  }

  // TODO : Mover "forms" como HOC, y sea props de UserFormRegister
  const form = [
    {
      label: "Nueva contraseña",
      type: "password",
      placeholder: "Nueva contraseña",
      name: "password",
      validation: { 
        required:{
          value: true,
          message: "La contraseña es requisito",
        },
        minLength: {
          value: 4,
          message: "Contraseña corta"
        }
      }
    },
    {
      label: "Repetir nueva contraseña",
      type: "password",
      placeholder: "Repetir nueva contraseña",
      name: "repassword",
      validation: { 
        validate: (value) => value === watch('password') || 'Debe coincidir las contraseñas',
      }
    },
  ];

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>Recuperación de contraseña</h1>
        <hr />

        <form 
          className='form--login'
          onSubmit={ handleSubmit( onSubmit ) }
        >
          {
            form.map( form => 
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
          <button 
            className={ loading ? 'btn btn--disabled' :'btn'} 
            disabled={ loading }
            type="submit" 
          >
            Restablecer nueva contraseña
          </button>
        </form>

        { loading && <Spinner /> }
        { error && <p className='message__error'>{ error }</p> }
        { data && <p className='message__success'>{ data }</p> }

        <UserNavigation />
      </div>
    </div>
  )
}

export default SetNewPassword;
