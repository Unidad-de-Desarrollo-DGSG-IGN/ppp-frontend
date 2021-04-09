import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { startRegister } from '../../actions/auth';
import UserFormInput from '../UserFormInput/UserFormInput.component';


const UserFormRegister = ( ) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, watch } = useForm( );
  const [ buttonSumitDisable, setButtonSumitDisable ] = useState( false );
  // const [serverResponse, setServerResponse] = useState( false );

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
          message : "El Correo electrónico es requisito"
        },
        pattern: {
          // value: /S+@S+.S+/,
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "El correo electrónico debe ser valido"
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
  ]

  const handleForm = ( dataForm ) => {
    setButtonSumitDisable( prev => !prev );
    const data = {
      ...dataForm,
      uuid : uuidv4(),
    };
    
    console.log(data);
    
    if ( data.password !== data.repassword ) {
      return console.log('Las contraseñas deben de ser iguales');
    }
    
    dispatch( startRegister( data.email, data.password, data.name, data.surname ) );
    setButtonSumitDisable( false );
  }
  
  return (
    <div>
      <form onSubmit={ handleSubmit( handleForm ) }>

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

        <button className='btn' type="submit" disabled={ buttonSumitDisable }>Registrar</button>
      </form>
      
      
      {/* { ( !serverResponse && buttonSumitDisable ) && <p>Servidor procesando</p> } */}
      { buttonSumitDisable && <p>Servidor procesando</p> }

    </div>
  )
}

export default UserFormRegister
