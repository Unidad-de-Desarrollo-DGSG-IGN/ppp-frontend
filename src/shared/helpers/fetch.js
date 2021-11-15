// const baseUrl = process.env.REACT_APP_API_URL;
import { config } from './../../config';

// const baseUrl = "http://172.20.201.39/ppp-test";
// const baseUrl = "http://melpomenia.linkpc.net/ppp";
const baseUrl = config.host;


const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  // console.log( '<fetch.js>/<fetchSinToken>: URL donde se va hacer la peticion', url );

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

    if( data === null ){
      return fetch( url, {
        method });
    }else {
      return fetch( url, {
        method,
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify( data )
      });
    }
  }
}


// const esTokenVencido = ( response ) => {
//   let tokenVencido = false;
//   if( response.status === 'fail' ){
//     if( response.data.code === 'auth_expired_token' ){
//       tokenVencido = true;
//     }
//   } 
//   return tokenVencido;
// }


// TODO : Rehacer la funcionalidad teniendo en cuenta que se vence el token y existe un token de renovacion.
const fetchConTokenFinal = ( endpoint, data, method = 'GET' ) => {
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


const fetchConToken = async( endpoint, username, info, method = 'GET' ) => {
  const token = await localStorage.getItem('token') || ''; // await quizas, o guardarlos en el estado?
  const tokenRenew = await localStorage.getItem('token_renew') || '';

  // TODIO : Revisar porque se dispara tantas veces el fetchConToken.
  // console.log( '<fecth.js>/<fetchConToken> :', username, endpoint ); 

  let passport = {
    // username: 'alan@ign.ar', // TODO : Usar Redux para recuperar username. Recuperar por parametro
    username: username,
    expiredToken: token,
    renovationToken: tokenRenew,
  } 

  // Usar async await para revisar si funciona de esa manera al devolver una promesa
  return fetchSinToken( 'auth/renew', passport, 'PUT' )
    .then( res => res.json( ) )
    .then(
      data => {
        // TODO : Guardar Tokens en LocalStorage
        // console.log( '<fetch.js>/<fetchSinToken>: Renew response', data );
        // console.log( '<fetch.js>/<fetchSinToken>: status', data.status );
        // console.log( '<fetch.js>/<fetchSinToken>: Token', data.data.token.access_token );
        // console.log( '<fetch.js>/<fetchSinToken>: Renew Token', data.data.token.renovation_token );
        localStorage.setItem( 'token', data.data.token.access_token );
        localStorage.setItem( 'token_renew', data.data.token.renovation_token );

        // TODO : fetchConToken FINAL
        // console.log( '<fetch.js>/<fetchSinToken>: endpoint, info, method', endpoint, info, method ) // info revisar
        // return fetchConTokenFinal( endpoint, info, method );
        // console.log( '<fetch.js>/<fetchSinToken>: Devolucion de fecth Con Token', fetchConTokenFinal( endpoint, info, method ) );
        return fetchConTokenFinal( endpoint, info, method );
      }
    )
    // .then( res => res.json() )
    // .then( res => console.log( 'Respuesta final: ', res) )
    .catch(
      err => {
        // TODO : Logout - Redux
        console.log( '<fetch.js>/<fetchSinToken>: Error Token. Logout', err);
        // dispatch( startLogout );
        // Avisar afuera que se debe hacer logout - Promise con Error
      }
    )

  // if ( method === 'GET' ) {
  //   // fetch( url, {
  //   //   method,
  //   //   headers: {
  //   //     'Authorization': `Bearer ${ token }`
  //   //   }
  //   // })
  //   // .then(
  //   //   res => res.json()
  //   // )
  //   // .then(
  //   //   response => { 
  //   //     console.log( 'Es token vencido?: ', esTokenVencido( response ) );
  //   //   }
  //   // );

  //   return fetch( url, {
  //     method,
  //     headers: {
  //       'Authorization': `Bearer ${ token }`
  //     }
  //   });
  // } else {
  //   return fetch( url, {
  //     method,
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': `Bearer ${ token }`
  //     },
  //     body: JSON.stringify( data )
  //   });
  // }
}


// TODO : agregar y modificar el tema del token para files
//        * Modificar la logica de este proceso, como con el anterior
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


const fetchFileSinToken = ( endpoint, formFile, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;

  if ( method === 'GET' ) {
    return fetch( url, {
      method,
    });
  } else {
    return fetch( url, {
      method,
      body: formFile
    });
  }
}


export {
  fetchSinToken,
  fetchConToken,
  fetchFileConToken,
  fetchFileSinToken,
}