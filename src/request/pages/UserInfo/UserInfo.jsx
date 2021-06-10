import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = ( ) => {

  const { firstname, lastname, email } = useSelector(state => state.auth)

  return (
    <div className='requests' >
      <div className='request-header' >
        <h3>Informacion del Usuario</h3>

        <p>Info del usuario en detalle</p>
        <hr/>
      </div>        

      <div className='request-container' >
        <h3>Info</h3>
        <div className='request-new__form' >
          <div>
            <p>Nombre: { firstname } </p>
          </div>
          <div>
            <p>Apellido: { lastname } </p>
          </div>
          <div>
            <p>Email: { email } </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
