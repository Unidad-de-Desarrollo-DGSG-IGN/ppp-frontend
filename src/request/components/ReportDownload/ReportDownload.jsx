import React from 'react';
import IconDownload from '../../../shared/components/IconDownload/IconDownload';
import { fetchFileConToken } from '../../../shared/helpers/fetch';

const ReportDownload = ( { pdfFileId } ) => {

  // TODO : Refaccionar mediante Redux, acciones.
  const downloadHandle = ( url ) => {
    console.log('click on download');
    try{
      fetchFileConToken( `files/${ url }` )
        .then( ( response ) => {
          response.blob( ).then( ( blob ) => {
            let url = window.URL.createObjectURL( blob );
            let a = document.createElement( 'a' );
            a.href = url;
            a.download = response.headers.get( 'Content-Disposition' ).replaceAll( '"', '' ).split( '=' )[ 1 ];
            a.click( );
          })
        }).catch( ( error ) => {
          console.log( '<AntennaDetail.jsx>/<AntennaDetail>: Error al abrir el pop-up de descarga del archivo', error );
        });

    }catch( err ){
      console.log('error al bajar informe');
    }
  };

  return (
    <div
      onClick={ ( ) => downloadHandle( pdfFileId ) }
    >
      <IconDownload />
    </div>
  );
};

export default ReportDownload;
