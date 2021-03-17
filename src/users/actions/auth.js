import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";


const login = ( user ) => ({
  type: types.authLogin,
  payload: user
});


export const startLogin = ( email, password ) => {
  return async( dispatch ) => {

    const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
    console.log(resp)
    const body = await resp.json();
    console.log(body)

    if( body.ok ) {
      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( login({
        uid: body.uid,
        name: body.name
      }) )
    } else {
      console.log('Error al loguearse');
    }
  }
}


const logout = ( ) => ({ type: types.authLogout });


export const startLogout = () => {
  return ( dispatch ) => {

    localStorage.clear();
    dispatch( logout() );
  }
}


export const startRegister = ( email, password, name, surname ) => {
  return async( dispatch ) => {
    const resp = await fetchSinToken( 'auth/new', { email, password, name, surname }, 'POST' );
    const body = await resp.json();

    if( body.ok ) {
      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( login({
        uid: body.uid,
        name: body.name
      }) )
    } else {
      console.log('Error al registrarse y loguearse');
    }
  }
}


const checkingFinish = () => ({ type: types.authCheckingFinish });


export const startChecking = () => {
  return async(dispatch) => {

    const resp = await fetchConToken( 'auth/renew' );
    const body = await resp.json();

    if( body.ok ) {
      localStorage.setItem('token', body.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( login({
        uid: body.uid,
        name: body.name
      }) )
    } else {
      dispatch( checkingFinish() );
    }
  }
}
