import { downloadHandler } from '../../shared/helpers/downloadHanlder';
import { types } from '../../shared/types/types';


const downloadReport = ( ) => ({
  type: types.downloadReport,
});

const downloadReportSuccess = ( info ) => ({
  type: types.downloadReport_success,
  payload: info,
});

const downloadReportError = ( info ) => ({
  type: types.downloadReport_error,
  payload: info,
});

export const dowloadReportClean = ( ) => ({
  type: types.downloadReport_clean,
});


export const startDownloadReport = ( reportId ) => {
  return async ( dispatch ) => {
    dispatch( downloadReport( ) );
    try {
      await downloadHandler( 'report', reportId );
      dispatch( downloadReportSuccess( 'Se ha descargado el informe.' ) );

      console.log('ok');
    } catch (error) {
      dispatch( downloadReportError( 'Se ha producido un error en la descarga del Informe.' ) );
      
      console.log('error');
    }
  }
}