import React, { useState } from 'react';

import RequestPopupErrorDetail from '../RequestPopupErrorDetail/RequestPopupErrorDetail';

const RequestErrorDetail = ( { icon, errorMsg } ) => {
  const [ isOpen, setIsOpen ] = useState( false );

  const togglePopup = ( ) => {
    setIsOpen( !isOpen );
  };

  return (
    <div>
      <div 
        className='icon-container'
        onClick={ togglePopup }
      >
        { icon }
      </div>
      { isOpen &&  <RequestPopupErrorDetail handleClose={ togglePopup } errorMsg={ errorMsg } /> }
    </div>
  )
}

export default RequestErrorDetail;