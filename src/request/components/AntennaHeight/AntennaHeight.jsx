import React from 'react';

const AntennaHeight = ( { register, errors, watch, antennas } ) => {
  let antennaTypeHeight = watch( 'antennaTypeHeight' );
  // const [ mustCalculate, setMustCalculate ] = useState(false);

  let mustCalculate;

  if( !!watch( 'antennaModel' ) ){
    mustCalculate = antennas
      .find( antenna => antenna.name === watch( 'antennaModel' ).value )?.height_types
      .find( height_type => height_type.name === watch( 'antennaTypeHeight' ).value )?.mustCalculateHeight;
  }


  return (
    <div className='form__row'>
          <label htmlFor='antennaHeight'>Altura de antena [m]</label>
          <input 
            type='number'
            min={0}
            disabled={ !antennaTypeHeight }
            step='.001'
            name='antennaHeight'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "La altura de la antena es requisito",
                },
                validate: ( ) => {
                  let antennaHeight = Number( watch( 'antennaHeight' ) );

                  console.log( 'mustCalculate: ' + mustCalculate );

                  if( mustCalculate ){
                    return antennaHeight < 0 ? 'La altura de la antena elegida no puede ser negativa.' : true;
                  }else{
                    return true;
                  }
                }
              }
            )}
            // onChange={
            //   ( ) => {

            //   }
            // }
            errors={ errors }
          />
          { errors['antennaHeight'] && <div> <p className='form__error'> {errors['antennaHeight'].message} </p> </div> }
        </div>
  )
};

export default AntennaHeight;
