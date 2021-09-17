import { fetchSinToken, fetchConToken } from "../../shared/helpers/fetch";
// import { logoutHelper } from "../../shared/helpers/logout";
import { types } from "../../shared/types/types";


// -------Nuevos actions
const authLogin = ( ) => ({ // modificar los nombres
  type: types.auth_login,
});

const authLoginSuccess = ( user ) => ({
   type: types.auth_login_success,
   payload: user,
});

const authLoginError = ( ) => ({
  type: types.auth_login_error,
});

const authLoginClean = ( ) => ({
  type: types.auth_login_clean,
});

// -------FIN - Nuevos actions


export const startLogin = ( email, password ) => {
  // console.log('<auth.js>/<startLogin> : Comienza el startLogin');
  return async( dispatch ) => {
    dispatch( authLogin( ) );

    try{
      let username = email;

      const resp = await fetchSinToken( 'auth', { username, password }, 'POST' );
      // console.log( '<auth.js>/<startLogin>: Respuesta del auth, al loguearse: ', resp );
      // console.log( '<auth.js>/<startLogin>: Estado de la respuesta del auth, al loguearse: ', resp.status );
      const body = await resp.json();
      // console.log( '<auth.js>/<startLogin>: Body de la respuesta del auth, al loguearse: ', body );
  
      if( body?.status === 'success' ){
  
        // TODO : Contemplar si el usuario quiere que se lo recuerde, y asi guardar en Local Storage
        await localStorage.setItem( 'token', body.data.token.access_token );
        await localStorage.setItem( 'token_renew', body.data.token.renovation_token );

        console.log( '<auth.js>/<startLogin>: user Info ', body.data.user)
        

        const respDataUser = await fetchConToken( `users/${ body.data.user.userId }`, username );
        const bodyDataUser = await respDataUser.json();
        console.log( '<auth.js>/<startLogin>: Body: ', bodyDataUser );

        if( bodyDataUser?.status === 'success' ){
          // console.log( '<auth.js>/<startLogin>: Body: ', body.data.user );
          // console.log( '<auth.js>/<startLogin>: BodyDataUser: ', bodyDataUser.data.user );
  
          // dispatch( loadingUserInfo( { username: body.data.user.email, uid: body.data.user.id, firstname: body.data.user.firstname, lastname: body.data.user.lastname } ) );

          // ----------------------------------------------------------
          // TODO: Hacer pedido de mas datos con el uid del usuario
          // TODO: Ver la forma de compactar en caso que se agregue mas campos a guardar.
          //        * saveDataOnLocalStorage({token, username, ...});
          localStorage.setItem( 'token', body.data.token.access_token );
          localStorage.setItem( 'token_renew', body.data.token.renovation_token );
          // localStorage.setItem( 'user', body.data.user.username );
          localStorage.setItem( 'username', body.data.user.username ); // Esto sera lo que pone username undefined?
          localStorage.setItem( 'uid', body.data.user.userId );
          
          localStorage.setItem( 'firstname', bodyDataUser.data.user.firstname );
          localStorage.setItem( 'lastname', bodyDataUser.data.user.lastname );
          // ----------------------------------------------------------

    
          // Dispatch de Login_success
          dispatch( authLoginSuccess({
            uid: body.data.user.userId,
            username: body.data.user.username,
            firstname: bodyDataUser.data.user.firstname,
            lastname: bodyDataUser.data.user.lastname,
          }) );
          // dispatch( startLoadingUserInfo( ) );

        }else {
          // TODO
          //      * Pensar en el error
          //      * Borrar lo guardado en el LocalStorage hasta el momento
          console.log( 'Error al Obtener toda la data user.' )
          dispatch( authLoginError( ) );
          setTimeout( ( ) => {
            dispatch( authLoginClean( ) )
          },
            3000
          );
        }
        
      } else {
        // console.log( '<auth.js>/<startLogin>: Error en el login' ); // TODO: modificar el estado temporalmente para msj error
        // dispatch( login_error )
        dispatch( authLoginError( ) );
        setTimeout( ( ) => {
          dispatch( authLoginClean( ) )
        },
          3000
        );
        // dispatch( logout ) - pensar si ponerlo
      }
      
    }catch{
      // console.log( '<auth.js>/<startLogin>: Error en el login' );
      dispatch( authLoginError( ) );
      // dispatch( login_error )
      // dispatch( logout ) - pensar si ponerlo
    }

    // if( body.ok ) {
    //   localStorage.setItem('token', body.token );
    //   localStorage.setItem('user', body.uid );

    //   dispatch( login({
    //     uid: body.uid,
    //     name: body.name
    //   }) )
    // } else {
    //   console.log('Error al loguearse');
    // }
  }
}

const logout = ( ) => ( { type: types.authLogout } );

export const startLogout = ( ) => {
  return ( dispatch ) => {

    // TODO : Ver como Hacer todo los dispatch de las acciones de logout
    //        Quizas crear un helper que reciba como parametro a "dispatch"
    localStorage.clear( );
    dispatch( logout( ) );
    // logoutHelper( dispatch );
  }
}


// TODO : Como modificar Para que haya un seguimiento de cada estadio del estado del proceso de la accion.

// /**
//  * 
//  * @param {object} userInfo 
//  * @returns {object} action userInfo
//  */
// const loadingUserInfo = ( userInfo ) => ({
//   type: types.authUserLoadingInfo,
//   payload: userInfo
// });


// /**
//  * 
//  * @returns 
//  */
// export const startLoadingUserInfo = ( ) => {
//   // console.log('<auth.js>/<startLoadingUserInfo> : Comienza el startLoadingUserInfo');
//   return async( dispatch, getState ) => {
//     try{
//       // TODO : username!!!
//       const { username }  = getState( ).auth.data;
//       console.log( '<auth.js>/<startLoadingUserInfo>: username', username );
//       const { uid } = getState().auth.data;
//       // console.log('<auth.js>/<startLoadingUserInfo> : uid: ', uid );
//       const resp = await fetchConToken( `users/${ uid }`, username );
//       const body = await resp.json();
//       // console.log( '<auth.js>/<startLoadingUserInfo>: Respuesta Info User', body.data.user );
//       // dispatch( loadingUserInfo( body.data.user ) );
//       dispatch( loadingUserInfo( { username: body.data.user.email, uid: body.data.user.id, firstname: body.data.user.firstname, lastname: body.data.user.lastname } ) );
//     }catch( err ){
//       console.log( '<auth.js>/<startLoadingUserInfo>: Error de Carga de datos del usuario' );
//     }
//   }
// }


// Mover a otro lado. 
// export const startRegister = ( email, password, name, surname, uuid ) => {
//   return async( dispatch ) => {
//     try{
//       let firstname = name;
//       let lastname = surname;
//       let id = uuid;
//       const resp = await fetchSinToken( 'users', { email, password, firstname, lastname, id }, 'POST' );
//       const body = await resp.json();
      
//       // TODO : Procesar la informacion en Redux para cuando se registra el usuario
//       // console.log( '<auth.js>/<startRegister>: Body de la respuesta al registrarse', body );
  
//       // if( body.ok ) {
//       //   localStorage.setItem('token', body.token );
//       //   localStorage.setItem('token-init-date', new Date().getTime() );
  
//       //   dispatch( login({
//       //     uid: body.uid,
//       //     name: body.name
//       //   }) )
//       // } else {
//       //   console.log('Error al registrarse y loguearse');
//       // }
//     }catch{
//       // TODO : Hacer action que avise que hubo error al loguearse.
//       console.log('<auth.js>/<startRegister>: Error al registrar');
//     }
//   }
// }


const checkingFinish = ( ) => ( { type: types.authCheckingFinish } );


export const startChecking = ( ) => {
  return async( dispatch ) => {

    // const resp = await fetchConToken( 'auth/renew' );
    // const body = await resp.json();
    // console.log('<auth.js>/<startChecking>: chequeando si hay informacion disponible de logueo en LocalStorage.');
    try{
      // TODO : Verificar si estan todo los datos del usuario guardados en Local Storage.
      let token = localStorage.getItem('token');
      // console.log('<auth.js>/<startChecking>: token: ', token);
      let user = localStorage.getItem('username');
      let uid = localStorage.getItem('uid');
      let firstname = localStorage.getItem('firstname');
      let lastname = localStorage.getItem('lastname');
      // console.log('<auth.js>/<startChecking>: usuario: ', user);

      if( token && user ){
        // console.log('<auth.js>/<startChecking>: Logueado');
        
        // TODO : Cargar datos usuario y hacer el dispatch. Falta firstname, lastname, etc.
        // Verificar que esten todos los datos hiper checkeados del usuario. data:{user}. Sino Logout.
        dispatch( authLoginSuccess({
          // uid: new Date().getDate(), // Revisar esto
          uid: uid, // Revisar esto
          username: user,
          firstname: firstname,
          lastname: lastname,
        }) );
      }else{
        console.log( '<auth.js>/<startChecking>: No esta logueado' );
        dispatch( checkingFinish( ) );
        // TODO : Tirar error de logueo(?) y hacer LOGOUT general, con todos los dispatch.
        authLoginError( );
      }
    }catch{
      console.log( '<auth.js>/<startChecking>: Error al checkear si tiene informacion para loguearse' );
      // TODO : Hacer logout, y error de logueo(?)
      // TODO : Clean Local Storage
    }

    // if( body.ok ) {
    //   localStorage.setItem('token', body.token );
    //   localStorage.setItem('token-init-date', new Date().getTime() );

    //   dispatch( login({
    //     uid: body.uid,
    //     name: body.name
    //   }) )
    // } else {
    //   dispatch( checkingFinish() );
    // }
  }
}
