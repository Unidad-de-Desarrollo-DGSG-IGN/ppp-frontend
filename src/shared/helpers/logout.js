import { formDataLogout } from "../../request/actions/formData";
import { ordersLogout } from "../../request/actions/orderFetch";
import { startLogout } from "../../users/actions/auth";


export const logoutHelper = ( dispatch ) => {
  dispatch( startLogout( ) );
  dispatch( formDataLogout( ) );
  dispatch( ordersLogout( ) );
}