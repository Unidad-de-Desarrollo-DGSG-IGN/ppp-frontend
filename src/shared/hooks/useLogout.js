import { useDispatch } from "react-redux";
import { formDataLogout } from "../../request/actions/formData";
import { ordersLogout } from "../../request/actions/orderFetch";
import { startLogout } from "../../users/actions/auth";


export const useLogout = ( ) => {
  const dispatch = useDispatch( );

  return(
    {
      handleLogout : ( ) => {
        dispatch( startLogout( ) );
        dispatch( formDataLogout( ) );
        dispatch( ordersLogout( ) );
      }
    }
  );
}