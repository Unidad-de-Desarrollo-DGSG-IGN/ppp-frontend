import React from 'react';
import RequestNewForm from '../../components/RequestNewForm/RequestNewForm';

const RequestNew = ( ) => {
  return (
    <div className='request-new' >
      <div className='request-new__header' >
        <h1>Nueva solicitud de procesamiento</h1>

        <p>El procesamiento comenzará luego de que sean transferidos todos los archivos de observación RINEX. Este proceso puede demorar algunos minutos.</p>
        <hr/>
      </div>

      <RequestNewForm />
    </div>
  )
}

export default RequestNew
