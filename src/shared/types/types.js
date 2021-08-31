export const types = {
  // AUTH: LOGIN - LOGOUT
  authLogin: '[auth] Login',
  // Nuevos Types para el Login
  auth_login: '[auth] Login start',
  auth_login_success: '[auth] Login success',
  auth_login_error: '[auth] Login error',
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

  // PROCESSING some Action
  // TODO : Pensar en hacer una accion que modifique el estado de la apliacion entera para que no haya conflicto entre acciones.
}