import React from 'react';

const UserFormInput = ( { label, type, placeholder, name, validation, register, errors } ) => {

  return (
    <div className='form__row'>
        <label htmlFor={name}>{label}</label>
        <input 
          type= {type} 
          placeholder= {placeholder} 
          name= {name} 
          ref= {register( validation )}
          className='form--input'
          // multiple  // Si se quiere que el input admita multiples archivos
        />

        { errors[name] && <p className='form__error'> {errors[name].message} </p> }
    </div>
  );
};

export default UserFormInput;