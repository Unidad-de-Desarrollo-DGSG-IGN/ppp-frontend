import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';


const AntennaModelInput = ( { errors, control, antennas } ) => {
  const options = antennas.map( antenna => ({
    value: `${antenna.name.replace(/ /g, "\u00a0")}`,
    label: `${antenna.name.replace(/ /g, "\u00a0")}`,
  }) );

  const coulourStyles = {
    control: styles => ({ ...styles, color: 'black', fontFamily: 'Nunito', fontSize: '1.2rem', }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: 'black',
        fontFamily: 'Nunito',
        fontSize: '1.2rem',
      };
    },
  }

  return (
    <div>
      <div className='form__row'>
         <label htmlFor='antennaTypeHeight'>Modelo de Antena</label>

          <Controller 
            name="antennaTypeHeight"
            as={ Select }
            placeholder={'Buscar modelo de antena'}
            defaultValue=""
            styles={ coulourStyles }
            control={ control }
            options= { options }
            rules={{
              required: {
                value : true,
                message : "El tipo de altura de antena es requisito"
              }
            }}
          />

          { errors[ 'antennaTypeHeight' ] && <div> <p className='form__error'> { errors['antennaTypeHeight'].message } </p> </div> }
        </div>
    </div>
  );
};

export default AntennaModelInput;
