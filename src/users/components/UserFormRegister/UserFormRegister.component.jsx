import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import UserFormInput from '../UserFormInput/UserFormInput.component';

import './UserFormRegister.style.css';

const UserFormRegister = ( ) => {
  const { register, handleSubmit, errors, watch } = useForm( );
  const [ buttonSumitDisable, setButtonSumitDisable ] = useState( false );
  // const [serverResponse, setServerResponse] = useState( false );

  const forms = [
    {
      label: "Nombre",
      type: "text",
      placeholder: "Nombre",
      name: "nombre",
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
      name: "apellido",
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
    
    const dataJson = JSON.stringify( data );
    // Enviar al Server
    // Obtener y manejar la respuesta del Server
    console.log(dataJson);

    fetch( `https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: dataJson,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then( resp => resp.json() )
      .then( dataResp => console.log("Respuesta servidor: ",dataResp) )
      .catch()

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

        <button type="submit" disabled={ buttonSumitDisable }>Registrar</button>
      </form>
      
      <hr/>
      
      {/* { ( !serverResponse && buttonSumitDisable ) && <p>Servidor procesando</p> } */}
      { buttonSumitDisable && <p>Servidor procesando</p> }

    </div>
  )
}

export default UserFormRegister
