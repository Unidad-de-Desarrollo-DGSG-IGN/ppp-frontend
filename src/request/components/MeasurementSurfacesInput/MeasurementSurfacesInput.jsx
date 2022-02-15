import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

// TODO : Cambiar antennas por MeasurementSurfaces
const MeasurementSurfacesInput = ( { errors, control, measurementSurfaces } ) => {
  
  // TODO : Cambiar options, quizas no es necesario mapear nada
  const options = measurementSurfaces.map( antenna => ({
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
  };

  return (
    <>
      <div className='form__row'>
         <label htmlFor='measurementSurfaces'>El punto BASE ha sido medido sobre:</label>

          <Controller
            menuPlacement="auto"
            name="measurementSurfaces"
            as={ Select }
            placeholder={'Buscar opciones de donde se ha medido'}
            defaultValue=""
            styles={ coulourStyles }
            control={ control }
            options= { options }
            rules={{
              required: {
                value : true,
                message : "Donde se ha medido el punto BASE es requisito"
              }
            }}
          />

          { errors[ 'measurementSurfaces' ] && <div> <p className='form__error'> { errors['measurementSurfaces'].message } </p> </div> }
        </div>
    </>
  );
};

export default MeasurementSurfacesInput;
