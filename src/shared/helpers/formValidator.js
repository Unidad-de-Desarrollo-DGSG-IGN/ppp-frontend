
export const isValidFile = ( fileName ) => {
  let isValid = false;

  // Regex expressions
  const rgxZ = /(.*)(\.Z)$/;
  const rgxD = /^(.*)(\...d)$$/;
  const rgxO = /^(.*)(\...o)$$/;

  // Test
  if( rgxZ.test( fileName ) || rgxO.test( fileName ) || rgxD.test( fileName ) ){
    isValid = true;
  }

  return isValid;
};