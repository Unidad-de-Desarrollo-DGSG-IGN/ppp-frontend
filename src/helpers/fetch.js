// const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = "http://172.20.201.39/ppp-test";
const baseUrl = "http://melpomenia.linkpc.net/ppp";


const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  console.log(url)

  if ( method === 'GET' ) {
    // return fetch( url,{
    //   'mode': 'no-cors',
    //   'headers': {
    //       'Access-Control-Allow-Origin': '*',
    //       // // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",//borrar
    //       // // "Access-Control-Allow-Headers": "Content-Disposition",//borrar
    //       // 'Access-Control-Allow-Credentials': true,//borrar
    //   } } );
    return fetch( url );
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify( data )
    });
  }
}


const fetchConToken = ( endpoint, data, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  const token = localStorage.getItem('token') || '';

  if ( method === 'GET' ) {
    return fetch( url, {
      method,
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    });
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify( data )
    });
  }
}


const fetchFileConToken = ( endpoint, formFile, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  const token = localStorage.getItem('token') || '';

  if ( method === 'GET' ) {
    return fetch( url, {
      method,
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    });
  } else {
    return fetch( url, {
      method,
      headers: {
        // 'Content-type': 'multipart/form-data',
        // 'Accept': '*/*',
        // 'Accept-Encoding': 'gzip,deflate,br',
        'Authorization': `Bearer ${ token }`
      },
      body: formFile
    });
  }
}


export {
  fetchSinToken,
  fetchConToken,
  fetchFileConToken
}