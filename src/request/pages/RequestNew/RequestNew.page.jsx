import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startFormDataLoadingAntenna } from "../../actions/formData";

import RequestNewForm from "../../components/RequestNewForm/RequestNewForm";

const RequestNew = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startFormDataLoadingAntenna());
    }, [dispatch]);
    return (
        <div className="request-new">
            <div className="request-new__header">
                <h3>Nueva solicitud de procesamiento</h3>

                <p>
                    El procesamiento comenzará luego de que sean transferidos
                    todos los archivos de observación RINEX. Este proceso puede
                    demorar algunos minutos. Ante cualquier inquietud o consulta
                    técnica envíe un correo electrónico a{" "}
                    <a href="mailto:ppp@ign.gob.ar">ppp@ign.gob.ar</a>
                </p>

                <hr />
            </div>

            <RequestNewForm />
        </div>
    );
};

export default RequestNew;
