import { fetchFileSinToken } from "./fetch";

// export const downloadHandler = ( endpoint, url ) => {
//   fetchFileSinToken( `${ endpoint }/${ url }` )
//     .then( ( response ) => {
//       response.blob( ).then( ( blob ) => {
//         let url = window.URL.createObjectURL( blob );
//         let a = document.createElement( 'a' );
//         a.href = url;
//         a.download = response.headers.get( 'Content-Disposition' ).replaceAll( '"', '' ).split( '=' )[ 1 ];
//         a.click( );
//       })
//     }).catch( ( error ) => {
//       console.log( 'Error al descargar' );
//     });
// };

export const downloadHandler = ( endpoint, url ) => {
  fetchFileSinToken( `${ endpoint }/${ url }` )
    .then( ( response ) => {
      if( response.status === 400 ) throw new Error('Error al descargar'); // TODO : Hacer funcion de condicion de descarga correcta
      response.blob( ).then( ( blob ) => {
        let url = window.URL.createObjectURL( blob );
        let a = document.createElement( 'a' );
        a.href = url;
        a.download = response.headers.get( 'Content-Disposition' ).replaceAll( '"', '' ).split( '=' )[ 1 ];
        a.click( );
      })
    })
    // .catch(err => {throw new Error('Error al descargar');} )
    .catch(err => console.log('error al descargar') )
};