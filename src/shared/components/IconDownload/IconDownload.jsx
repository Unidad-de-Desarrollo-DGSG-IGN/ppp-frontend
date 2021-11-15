import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const IconDownload = ( { size = 4 } ) => {
  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
    >
      <FontAwesomeIcon 
        icon={ faArrowAltCircleDown } 
        className={ styles.icon }
      />
    </div>
  );
};

export default IconDownload;
