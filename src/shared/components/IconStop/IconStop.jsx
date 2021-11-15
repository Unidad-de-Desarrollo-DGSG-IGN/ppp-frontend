import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const IconStop = ( { size = 4 } ) => {
  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
    >
      <FontAwesomeIcon 
        icon={ faStopCircle } 
        className={ styles.icon }
      />
    </div>
  );
};

export default IconStop;