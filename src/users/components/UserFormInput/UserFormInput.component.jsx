import React from 'react';

const UserFormInput = ( { label, type, placeholder, name, validation, register, errors } ) => {
  // console.log(validation);
  // console.log(register);

  return (
    <div className='form__row'>
        <label htmlFor={name}>{label}</label>
        <input 
          type= {type} 
          placeholder= {placeholder} 
          name= {name} 
          ref= {register( validation )}
          className='form--input'
        />

        { errors[name] && <p className='form__error'> {errors[name].message} </p> }
    </div>
  )
}

export default UserFormInput