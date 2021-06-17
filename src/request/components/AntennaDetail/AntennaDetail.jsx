import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { fetchFileConToken } from '../../../helpers/fetch';

const AntennaDetail = ( { base_name, url_rinex, antenna_model, antenna_type_height, antenna_height } ) => {
  
  const downloadHandle = ( url ) => {
    console.log(url);
    // .then(function(resp) {
      //   // return resp.blob();
      //   console.log( resp );
      // })
    fetchFileConToken( `files/${ url }` )
      .then((response) => {
        console.log( response );
        for (var pair of response.headers.entries()) {
          console.log(pair[0]+ ': '+ pair[1]);
        }
        console.log( response.headers.get('Content-Disposition') );
        // response.json().then( res => console.log(res) )

        response.blob().then(blob => {
          console.log( blob );
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          // a.download = 'employees';
          a.click();
          console.log(a );
        })

        // response.blob().then( blob => {
        //     let blobUrl = window.URL.createObjectURL(blob);
        //     // Can not directly create a <a> tag
        //     // let a = document.createElement('a_id');
        //     let a = document.getElementById('a_id');
        //     // can not get the file name from the returned file stream
        //     // let filename = response.headers.get('Content-Disposition');
        //     let filename = 'file.txt';
        //     a.href = blobUrl;
        //     a.download = filename;
        //     a.click();
        //     window.URL.revokeObjectURL(blobUrl);
        // });
      }).catch((error) => {
        console.log(error);
    
    //   // .then(function(blob) {
    //   //   download(blob);
    //   // });
      });

  };

  return (
    <div>
      {/* TODO : Poner url de descarga al logo */}
      <p>RINEX del punto { base_name }: 
        <div className='icon-container'
          onClick={ () => downloadHandle( url_rinex ) }
        >
          {/* TODO: Poner link de descarga */}
          <FontAwesomeIcon icon={ faDownload } className='icon' />
        </div>
        {/* <a href={`http://172.20.201.39/ppp-test/files${ url_rinex }`} download>Click to download</a> */}
      </p> 
      <p>Modelo de antena: { antenna_model }</p>
      <p>Tipo de altura de antena: { antenna_type_height } </p>
      <p>Altura de antena: {antenna_height } </p>
    </div>
  )
}

export default AntennaDetail;
