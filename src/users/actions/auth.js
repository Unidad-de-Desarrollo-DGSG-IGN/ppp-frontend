import { fetchSinToken } from "../../helpers/fetch";
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
      localStorage.setItem('user', body.uid );

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

    // const resp = await fetchConToken( 'auth/renew' );
    // const body = await resp.json();
    console.log('chequeando!')
    try{
      let token = localStorage.getItem('token');
      console.log('token: ', token)
      let user = localStorage.getItem('user');
      console.log('usuario: ', user)

      if( token && user ){
        console.log('Logueado');
        dispatch( login({
          uid: new Date().getDate(),
          name: user
        }) )
      }else{
        console.log('Sali de aca, no estas logueado');
        dispatch( checkingFinish() );
      }
    }catch{
      console.log('Error')
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
