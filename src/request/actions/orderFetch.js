import { fetchConToken } from "../../shared/helpers/fetch";
import { types } from "../../shared/types/types";
import { startLogout } from "../../users/actions/auth";

// HELPERS
// TODO : Revisar problema de sincronizacion, se puede arreglar por useEffect que cuando cambie un estado se vuelva a calcular
// TODO : Trasladar los helpers a otro archivo para poder reutilizarlos
// TODO : Revisar y decidir que pasa cuando una propiedad no existe
// TODO : Documentar las funciones

const antenna_model = (antennas, antennaId) => {
    return antennas.find((antenna) => antenna.id === antennaId).name;
};

const typeError = (processingError) => {
    if (processingError !== null) {
        const regex = /^\[(\d*)\]/;
        const matches = processingError.match(regex);

        if (!matches) return null;

        const numberError = matches[1];

        if (isNaN(Number(numberError))) return "Error del proceso de la orden";
        return Number(numberError);
    } else {
        return null;
    }
};

const stateOrder = (status) => {
    switch (status) {
        case "PROCESSING":
            return "Procesando";

        case "CANCELLED":
            return "Cancelado";

        case "FINISHED":
            return "Terminado";

        default:
            return "Procesando";
    }
};

const typeHeight = (antennas, antennaId, antennaHeightTypeId) => {
    const antenna_order = antennas.find((antenna) => antenna.id === antennaId);
    return antenna_order.height_types.find(
        (height_type) => height_type.id === antennaHeightTypeId
    ).name;
};

// TODO : Revisar el fetchConToken, pasar el username, o levantarlo desde el LocalStorage. O hacer una accion cargar orders: LoadOrders
const movingPoints = async (orderId, antennas, username) => {
    const res = await fetchConToken(`orders/${orderId}`, username);
    const resOrders = await res.json();
    // console.log( '<orderFetch.js>/<movingPoints>: Moving Point: ', resOrders.data.order.movingPoints );

    return resOrders.data.order.movingPoints.map((movingPoint) => ({
        url_rinex: movingPoint.file.id,
        base_name: movingPoint.name,
        antenna_model: antenna_model(antennas, movingPoint.antennaId),
        antenna_height: movingPoint.heigth,
        antenna_type_height: typeHeight(
            antennas,
            movingPoint.antennaId,
            movingPoint.antennaHeightTypeId
        ),
    }));
    // return( resOrders.data.order.movingPoints );
};

// ACTIONS

/**
 * Es una funcion que devuelve un objeto en el formato de una action que requiere redux.
 * Devuelve una action, solo indicando el tipo de action cuando se produce el logout del usuario.
 * @returns {object} action
 */
export const ordersLogout = () => ({
    type: types.ordersLogout,
});

/**
 * Es una funcion que devuelve un objeto en el formato de una action que requiere redux.
 * Recibe una lista del tipo de orders del usuario.
 * Devuelve una action con el tipo para cargar las ordenes, y el payload donde estan la lista de las ordenes
 * @param {object[]} orders
 * @returns {object} action
 */
// const ordersLoading = ( orders ) => ({
//   type: types.ordersLoading,
//   payload: orders,
// });

const LoadOrders = () => ({
    type: types.loadOrders,
});

const LoadOrdersSuccess = (orders) => ({
    type: types.loadOrders_success,
    payload: orders,
});

const LoadOrdersError = (errorMsg) => ({
    type: types.loadOrders_error,
    payload: errorMsg,
});

/**
 * Es una funcion que modifica de forma asincronica el estado en redux con un objeto en el formato de una action que requiere redux.
 * TODO: En caso de ocurrir algun error modificara el estado de ERROR de forma sincrona.
 * No recibe parametros.
 * Devuelve un funcion asincronica, donde luego se llevara a cabo la modificacion del estado de forma sincronica.
 * @returns {function} action function
 */
export const startOrdersLoading = () => {
    return async (dispatch, getState) => {
        dispatch(LoadOrders());
        try {
            const { username } = getState().auth.data;

            const resList = await fetchConToken("orders", username);
            // console.log( 'Respuesta ordenes: ', resList )
            if (resList.message === "renew invalid") {
                dispatch(startLogout());
            }

            const resOrders = await resList.json();

            const orders = await resOrders.data.orders.map((order) => ({
                date_order: order.creationDate,
                state_order: stateOrder(order.status),
                pdfFileId: order.pdfFileId,
                processingError: typeError(order.processingError), // TODO : revisar bug
                // urlError: order.url,
                base_point: {
                    url_rinex: order.fileId,
                    base_name: order.name,
                    project: order.project,
                    antenna_model: order.antennaId,
                    antenna_height: order.height,
                    antenna_type_height: order.antennaHeightTypeId,
                    measurementSurfaceId: order.measurementSurfaceId,
                },
                // mobile_points: await movingPoints( order.id ) || [], // TODO devolver la lista de mobile points ya procesados
            }));

            dispatch(LoadOrdersSuccess(orders));
        } catch (err) {
            // TODO : UX Manejar el error cambiando el estado de ERRORES de forma sincronica
            console.log(err);
            if (err.message === "renew invalid") {
                dispatch(startLogout());
            }
            dispatch(LoadOrdersError("Error en la carga de las ordenes")); // TODO : Hacer un archivo separado con objeto de mensajes de errores. Y no hardcodear dichos mensajes
        }
    };
};
