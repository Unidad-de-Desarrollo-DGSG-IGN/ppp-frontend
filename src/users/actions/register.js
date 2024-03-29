import { v4 as uuidv4 } from "uuid";
import { fetchSinToken } from "../../shared/helpers/fetch";
import { types } from "./../../shared/types/types";

// Primary Actions

const sendRegister = () => ({
    type: types.sendRegister,
});

const sendRegisterSuccess = (msg) => ({
    type: types.sendRegister_success,
    payload: msg,
});

const sendRegisterError = (msg) => ({
    type: types.sendRegister_error,
    payload: msg,
});

export const sendRegisterClean = () => ({
    type: types.sendRegister_clean,
});

// Async Actions

export const startSendRegister = (dataForm) => {
    return async (dispatch) => {
        dispatch(sendRegister());
        try {
            // TODO : Refactorizar
            const data = {
                ...dataForm,
                uuid: uuidv4(),
            };

            // TODO : Refactorizar envio de informacion al servidor
            const resp = await fetchSinToken(
                "users",
                {
                    email: data.email,
                    password: data.password,
                    firstname: data.name,
                    lastname: data.surname,
                    id: data.uuid,
                },
                "POST"
            );
            const body = await resp.json();

            if (body?.status === "success") {
                let msg =
                    "El registro ha sido exitoso. En breve recibirá un correo electrónico para verificar su cuenta.";
                dispatch(sendRegisterSuccess(msg));
            } else {
                let errorDefaultMsg =
                    "Ha ocurrido un error en el registro de la cuenta.";

                // console.log(body);

                let response = await fetchSinToken("error-codes");
                let errors = await response.json();
                let errorMessage = errors.data.errors.find(
                    (errorCode) => errorCode.code === body.data.code
                )?.description;

                if (errorMessage) {
                    errorMessage = (
                        <p>
                            {errorMessage.replace(
                                '"¿Olvidó su contraseña?"',
                                ""
                            )}
                            :{" "}
                            <a href="https://www.ign.gob.ar/ppp/auth/recoverPassword">
                                ¿Olvidó su contraseña?
                            </a>
                        </p>
                    );
                }
                dispatch(
                    sendRegisterError(
                        errorMessage ? errorMessage : errorDefaultMsg
                    )
                );
            }
        } catch (err) {
            let errorMsg = "Ha ocurrido un error en el registro de la cuenta.";
            dispatch(sendRegisterError(errorMsg));
        }
    };
};
