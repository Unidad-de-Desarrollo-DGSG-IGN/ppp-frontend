import React from 'react';

const RequestFooter = ( ) => {
  const currentYear = new Date().getFullYear();

  return (
    // TODO - Revisar ultima version del Footer
    <div className='request-footer' >
      <h4> República Argentina | Todos los derechos reservados | IGN { currentYear }</h4>
    </div>
  )
}

export default RequestFooter;
