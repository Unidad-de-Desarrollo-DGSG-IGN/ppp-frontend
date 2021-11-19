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
    <>
      <div className='form__row'>
         <label htmlFor='antennaModel'>Modelo de Antena</label>

          <Controller 
            name="antennaModel"
            as={ Select }
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

          {/* <select 
            name='antennaModel'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "El modelo de antena es requisito"
                }
              }
            )}
            errors={ errors }
          >
            {
              antennas.map( antenna => 
                 <option key={antenna.id}>{ `${antenna.name.replace(/ /g, "\u00a0")}` }</option>
              )
            }
          </select> */}

          { errors[ 'antennaModel' ] && <div> <p className='form__error'> { errors['antennaModel'].message } </p> </div> }
        </div>
    </>
  );
};

export default AntennaModelInput;
