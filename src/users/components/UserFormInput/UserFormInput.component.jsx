import React from 'react';

const UserFormInput = ( { label, type, placeholder, name, validation, register, errors } ) => {
  // console.log(validation);
  // console.log(register);

  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input 
          type= {type} 
          placeholder= {placeholder} 
          name= {name} 
          ref= {register( validation )}
        />

        { errors[name] && <p> {errors[name].message} </p> }
    </div>
  )
}

export default UserFormInput