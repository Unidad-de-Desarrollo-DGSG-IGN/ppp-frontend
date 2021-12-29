import React from 'react';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';


const AntennaModelInput = ( { errors, control, antennas } ) => {
  // TODO : Revisar espacio en blancos
  const options = antennas.map( antenna => ({
    // value: `${antenna.name.replace(/ /g, "\u00a0")}`,
    // label: `${antenna.name.replace(/ /g, "\u00a0")}`,
    value: `${antenna.name}`,
    label: `${antenna.name}`,
  }) );

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">No se encontro modelo de antena</span> 
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
    <>
      <div className='form__row'>
         <label htmlFor='antennaModel'>Modelo de Antena</label>

          <Controller 
            name="antennaModel"
            as={ Select }
            components={ { NoOptionsMessage } }
            placeholder={'Buscar modelo de antena'}
            defaultValue=""
            styles={ coulourStyles }
            control={ control }
            options= { options }
            rules={{
              required: {
                value : true,
                message : "El modelo de antena es requisito"
              }
            }}
          />

          { errors[ 'antennaModel' ] && <div> <p className='form__error'> { errors['antennaModel'].message } </p> </div> }
        </div>
    </>
  );
};

export default AntennaModelInput;
