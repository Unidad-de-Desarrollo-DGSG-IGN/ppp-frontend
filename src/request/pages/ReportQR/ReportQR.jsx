import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IconDownload from '../../../shared/components/IconDownload/IconDownload';

import Spinner from '../../../shared/components/loadings/Spinner/Spinner';
import PppPresentation from '../../../shared/components/PppPresentation/PppPresentation';
import { downloadHandler } from '../../../shared/helpers/downloadHanlder';
import UserNavigation from '../../../users/components/UserNavigation/UserNavigation.component.jsx';
import { startDownloadReport } from '../../actions/reportFetch';

const ReportQR = ( ) => {
  const dispatch = useDispatch( );
  const { data, loading, error } = useSelector( state => state.registerVerification );

  const { code, base } = useParams( );

  useEffect( ( ) => {
    dispatch( startDownloadReport( code ) );
  }, [ code, dispatch ] );

  return (
    <div className='form'>
      <PppPresentation />

      <div className='user-fields' >
        <h1>Descarga de informe</h1>
        <hr />

        <div
          onClick={ ( ) => downloadHandler( 'report', code ) }
        >
          <IconDownload /> Descargar reporte del punto { base }
        </div>

        { loading && <Spinner /> }
        { error && <p>{ error }</p> }
        { data && <p>{ data }</p> }

        <UserNavigation />
      </div>
    </div>
  )
}

export default ReportQR;
