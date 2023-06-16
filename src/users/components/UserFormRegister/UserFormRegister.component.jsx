import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import { startSendRegister } from '../../actions/register';
import UserFormInput from '../UserFormInput/UserFormInput.component';

const UserFormRegister = ( ) => {
  const dispatch = useDispatch( );

  const { register, handleSubmit, errors, watch } = useForm( );
  const { loading, error, data } = useSelector( state => state.register );

  // TODO : Mover "forms" como HOC, y sea props de UserFormRegister
  const forms = [
    {
      label: "Nombre",
      type: "text",
      placeholder: "Nombre",
      name: "name",
      validation: { 
        required: {
          value : true,
          message : "El nombre es requisito"
        }
      }
    },
    {
      label: "Apellido",
      type: "text",
      placeholder: "Apellido",
      name: "surname",
      validation: { 
        required: {
          value : true,
          message : "El apellido es requisito"
        }
      }
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Email",
      name: "email",
      validation: { 
        required: {
          value : true,
          message : "El correo electrónico es requisito"
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "El correo electrónico debe ser válido"
        }
      }
    },
    {
      label: "Contraseña",
      type: "password",
      placeholder: "Contraseña",
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
      label: "Repetir contraseña",
      type: "password",
      placeholder: "Repetir contraseña",
      name: "repassword",
      validation: { 
        validate: (value) => value === watch('password') || 'Debe coincidir las contraseñas',
      }
    },
  ];

  const handleForm = async ( dataForm ) => {
    dispatch( startSendRegister( dataForm ) );
  };
  
  return (
    <div>
      <form
        className='form--register'
        onSubmit={ handleSubmit( handleForm ) }
      >

        {forms.map( form => 
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
        )}

        <button 
          className={ loading ? 'btn btn--disabled' :'btn'} 
          disabled={ loading }
          type="submit" 
        >
          Registrar
        </button>
      </form>
      
      { loading && <Spinner /> }
      { error && <p className='message__error'>{ error }</p> }
      { data && <p className='message__success'>{ data }</p> }

    </div>
  )
}

export default UserFormRegister;
