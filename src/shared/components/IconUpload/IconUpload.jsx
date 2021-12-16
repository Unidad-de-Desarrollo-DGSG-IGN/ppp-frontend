import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const IconUpload = ( { size = 4, title = 'Seleccionar archivo' } ) => {
  return (
    <div 
      className={ styles.iconContainer }
      style={ { height: `${size}rem`, width: `${size}rem` } }
    >
      <FontAwesomeIcon
        title={ title }
        icon={ faUpload } 
        className={ styles.icon }
      />
    </div>
  );
};

export default IconUpload;
