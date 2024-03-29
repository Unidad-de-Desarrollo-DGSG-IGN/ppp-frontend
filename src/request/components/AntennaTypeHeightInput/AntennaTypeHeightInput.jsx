import React from 'react';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';


const AntennaTypeHeightInput = ( { errors, control, antennas, watch } ) => {

  const options = antennas.find( antenna => antenna.name === watch("antennaModel").value )?.height_types.map( height_type => ({
    value: `${height_type.name}`,
    label: `${height_type.name}`,
  }) ) || null;

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">No se encontro tipo de altura de antena</span> 
      </components.NoOptionsMessage>
    );
  };

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
      <div className='form__row'>
         <label htmlFor='antennaTypeHeight'>Tipo de altura de antena</label>

          <Controller 
            name="antennaTypeHeight"
            isDisabled={ watch('antennaModel') === '' }
            as={ Select }
            components={ {NoOptionsMessage} }
            placeholder={'Buscar altura de antena'}
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
  );
};

export default AntennaTypeHeightInput;
