import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { faTable, faList } from "@fortawesome/free-solid-svg-icons";

import { sendNewOrderClean } from "../../actions/newOrder";
import styles from "./styles.module.scss";

// TODO : Mejorar el estilo del componente.
const RequestNewSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sendNewOrderClean());
    }, [dispatch]);

    return (
        <div className="requests">
            <div className="request-header">
                <h3>Solicitud</h3>

                <hr />
            </div>

            <div className="request-container request-container--column">
                <div className="request-new__form request-new__form--success">
                    <h3>Solicitud generada correctamente</h3>
                    <div className={styles.row}>
                        <p>
                            Su solicitud ha sido enviada, y será procesada a la
                            brevedad. Si el procesamiento finaliza
                            correctamente, se habilitará en la aplicación la
                            descarga del reporte con los resultados y también se
                            enviará en forma automática un correo electrónico.
                            En caso de no recibir el mismo en los próximos
                            minutos, recuerde que puede verificar en todo
                            momento su estado desde la sección "Solicitudes", y
                            en caso de requerir soporte técnico adicional puede
                            comunicarse a través de{" "}
                            <a href="mailto:ppp@ign.gob.ar">ppp@ign.gob.ar</a> .
                        </p>
                    </div>
                </div>

                <div className="nav__options nav__options--column">
                    <NavLink
                        className="navlink navlink--border"
                        to="/requests/requests"
                    >
                        <FontAwesomeIcon icon={faTable} className="icon" />{" "}
                        Solicitudes
                    </NavLink>

                    <NavLink
                        className="navlink navlink--border"
                        to="/requests/request-new"
                    >
                        <FontAwesomeIcon icon={faList} className="icon" /> Nueva
                        solicitud
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default RequestNewSuccess;
