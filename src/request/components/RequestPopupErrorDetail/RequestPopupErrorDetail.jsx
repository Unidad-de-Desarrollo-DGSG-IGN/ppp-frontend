import React, { useEffect } from "react";
import { useState } from "react";
import { fetchSinToken } from "../../../shared/helpers/fetch";

const RequestPopupErrorDetail = ({ handleClose, errorMsg }) => {
    const [error, setError] = useState("");
    const [urlError, setUrlError] = useState(null);

    useEffect(() => {
        if (errorMsg === null) {
            setError(
                "Error de procesamiento. Por favor, ponerse en contacto con ppp@ign.gob.ar"
            );
        } else if (isNaN(errorMsg)) {
            setError(errorMsg);
        } else {
            fetchSinToken("error-codes")
                .then((errorRaw) => errorRaw.json())
                .then((errors) => {
                    setError(
                        errors.data.errors.find(
                            (errorCode) => errorCode.code === errorMsg
                        )?.description
                    );
                    setUrlError(
                        errors.data.errors.find(
                            (errorCode) => errorCode.code === errorMsg
                        )?.url
                    );
                });
        }
    }, [errorMsg]);

    const ErrorSection = (errorMsg) => {
        return (
            <>
                <h4>Motivo de cancelación de la solicitud</h4>
                <p>
                    {errorMsg}{" "}
                    {urlError && (
                        <a href={urlError} target="_blank" rel="noreferrer">
                            (Más información)
                        </a>
                    )}{" "}
                </p>
            </>
        );
    };

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>
                    x
                </span>

                {ErrorSection(error)}
            </div>
        </div>
    );
};

export default RequestPopupErrorDetail;
