import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const IconCancel = ( { size = 4 } ) => {
  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
    >
      <FontAwesomeIcon 
        icon={ faTimesCircle } 
        className={ styles.icon }
      />
    </div>
  );
};

export default IconCancel;
