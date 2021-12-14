import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const IconStop = ( { size = 4, title = '' } ) => {
  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
      title={ title }
    >
      <FontAwesomeIcon 
        icon={ faStopCircle } 
        className={ styles.icon }
      />
    </div>
  );
};

export default IconStop;