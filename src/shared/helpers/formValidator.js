
export const isValidFile = ( fileName ) => {
  let isValid = false;

  // Regex expressions
  const rgxZ = /(.*)(\.[zZ])$/;
  const rgxD = /^(.*)(\...[dD])$$/;
  const rgxO = /^(.*)(\...[oO])$$/;

  // Test
  if( rgxZ.test( fileName ) || rgxO.test( fileName ) || rgxD.test( fileName ) ){
    isValid = true;
  }

  return isValid;
};