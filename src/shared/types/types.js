export const types = {
  // AUTH: LOGIN - LOGOUT
  authLogin: '[auth] Login',
  // Nuevos Types para el Login
  auth_login: '[auth] Login start',
  auth_login_success: '[auth] Login success',
  auth_login_error: '[auth] Login error',
  auth_login_clean: '[auth] Login clean',
  // FIN - Nuevos Types para el Login
  authLogout: '[auth] Logout',
  authCheckingFinish: '[auth] Finish checking login state',
  authUserLoadingInfo: '[auth] Loading user information',

  // FORMDATA
  // NUEVO
  loadFormData: '[form] Load antennas data start',
  loadFormData_success: '[form] Load antennas data success',
  loadFormData_error: '[form] Load antennas data error',
  // FIN - NUEVO
  formDataLoadingAntennas: '[form] Loading antennas info',
  formDataLogout: '[form] Logout',
  
  // ORDERS
  // Nuevos Types
  loadOrders : '[orders] Start Loading orders',
  loadOrders_success : '[orders] Loading orders success',
  loadOrders_error : '[orders] Loading orders error',
  // FIN - Nuevos Types
  ordersLoading: '[orders] Loading user orders',
  ordersLogout: '[orders] Logout',

  // NEW ORDER
  // TODO : Pensar en hacer acciones para envio de archivo, y luego de la orden
  sendOrder: '[new order] start send new order',
  sendOrder_success: '[new order] send new order success',
  sendOrder_error: '[new order] send new order error',
  sendOrder_logout: '[new order] send new order logout',
  sendOrder_clean: '[new order] clean order',

  sendRegister: '[register] start send register form',
  sendRegister_success: '[register] send register success',
  sendRegister_error: '[register] send register error',
  sendRegister_clean: '[register] send register clean',

  sendVerification: '[register verification] start send register verification',
  sendVerification_success: '[register verification] send verification success',
  sendVerification_error: '[register verification] send verification error',
  sendVerification_clean: '[register verification] clean verification clean',

  sendRecoverPassword: '[recover password] start recover password',
  sendRecoverPassword_success: '[recover password] recover password success',
  sendRecoverPassword_error: '[recover password] recover password error',
  sendRecoverPassword_clean: '[recover password] recover password clean',

  downloadReport: '[download report] start download report',
  downloadReport_success: '[download report] download success',
  downloadReport_error: '[download report] download error',
  downloadReport_clean: '[download report] download clean',

  loadOrderDetail: '[load order detail] start load antenna detail',
  loadOrderDetail_success: '[load order detail] load antenna detail success',
  loadOrderDetail_error: '[load order detail] load antenna detail error',
  loadOrderDetail_clean: '[load order detail] clean antenna detail',

  // PROCESSING some Action
  // TODO : Pensar en hacer una accion que modifique el estado de la apliacion entera para que no haya conflicto entre acciones.
}