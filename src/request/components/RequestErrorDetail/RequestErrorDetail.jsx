import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import RequestPopupDetail from '../RequestPopupDetail/RequestPopupDetail';

const RequestTableDetail = ( { data } ) => {
  const [ isOpen, setIsOpen ] = useState( false );

  const togglePopup = ( ) => {
    setIsOpen( !isOpen );
  };
  // console.log( 'data cell:', data );

  return (
    <div>
      <div 
        className='icon-container'
        onClick={ togglePopup }
      >
        <FontAwesomeIcon 
          icon={ faInfoCircle } 
          className='icon'
        />
      </div>
      { isOpen &&  <RequestPopupDetail handleClose={ togglePopup } data={ data } /> }
    </div>
  )
}

export default RequestTableDetail;