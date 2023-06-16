import { fetchSinToken, fetchConToken } from "../../shared/helpers/fetch";
import { types } from "../../shared/types/types";


const authLogin = ( ) => ({
  type: types.auth_login,
});

const authLoginSuccess = ( user ) => ({
   type: types.auth_login_success,
   payload: user,
});

const authLoginError = ( ) => ({
  type: types.auth_login_error,
});

export const authLoginClean = ( ) => ({
  type: types.auth_login_clean,
});

export const startLogin = ( email, password ) => {
  return async( dispatch ) => {
    dispatch( authLogin( ) );

    try{
      let username = email;

      const resp = await fetchSinToken( 'auth', { username, password }, 'POST' );
      const body = await resp.json();
  
      if( body?.status === 'success' ){
  
        await localStorage.setItem( 'token', body.data.token.access_token );
        await localStorage.setItem( 'token_renew', body.data.token.renovation_token );        

        const respDataUser = await fetchConToken( `users/${ body.data.user.userId }`, username );
        const bodyDataUser = await respDataUser.json();

        if( bodyDataUser?.status === 'success' ){
          // ----------------------------------------------------------
          // TODO: Hacer pedido de mas datos con el uid del usuario
          // TODO: Ver la forma de compactar en caso que se agregue mas campos a guardar.
          //        * saveDataOnLocalStorage({token, username, ...});
          localStorage.setItem( 'token', body.data.token.access_token );
          localStorage.setItem( 'token_renew', body.data.token.renovation_token );
          localStorage.setItem( 'username', body.data.user.username ); // Esto sera lo que pone username undefined?
          localStorage.setItem( 'uid', body.data.user.userId );
          
          localStorage.setItem( 'firstname', bodyDataUser.data.user.firstname );
          localStorage.setItem( 'lastname', bodyDataUser.data.user.lastname );
          // ----------------------------------------------------------

          dispatch( authLoginSuccess({
            uid: body.data.user.userId,
            username: body.data.user.username,
            firstname: bodyDataUser.data.user.firstname,
            lastname: bodyDataUser.data.user.lastname,
          }) );

        }else {
          dispatch( authLoginError( ) );
        }
        
      } else {
        dispatch( authLoginError( ) );
      }
      
    }catch{
      dispatch( authLoginError( ) );
    }
  }
}

const logout = ( ) => ( { type: types.authLogout } );

export const startLogout = ( ) => {
  return ( dispatch ) => {

    // TODO : Ver como Hacer todo los dispatch de las acciones de logout
    //        Quizas crear un helper que reciba como parametro a "dispatch"
    localStorage.clear( );
    dispatch( logout( ) );
  }
}

const checkingFinish = ( ) => ( { type: types.authCheckingFinish } );


export const startChecking = ( ) => {
  return async( dispatch ) => {

    try{
      // TODO : Verificar si estan todo los datos del usuario guardados en Local Storage.
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('username');
      let uid = localStorage.getItem('uid');
      let firstname = localStorage.getItem('firstname');
      let lastname = localStorage.getItem('lastname');

      if( token && user ){
        // TODO : Cargar datos usuario y hacer el dispatch. Falta firstname, lastname, etc.
        //        Verificar que esten todos los datos hiper checkeados del usuario. data:{user}. Sino Logout.
        dispatch( authLoginSuccess({
          uid: uid, // TODO : Revisar esto
          username: user,
          firstname: firstname,
          lastname: lastname,
        }) );
      }else{
        dispatch( checkingFinish( ) );
        dispatch( authLoginError( ) );
        dispatch( startLogout( ) );
        // TODO : Tirar error de logueo(?) y hacer LOGOUT general, con todos los dispatch.
      }
    }catch{
      dispatch( startLogout( ) );
      // TODO : Hacer logout, y error de logueo(?)
      // TODO : Clean Local Storage
    }
  }
}
