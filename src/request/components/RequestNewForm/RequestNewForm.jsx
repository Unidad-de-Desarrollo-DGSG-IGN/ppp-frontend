import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UserFormInput from "../../../users/components/UserFormInput/UserFormInput.component";
import withData from "./withData";
import { startSendNewOrder } from "../../actions/newOrder";
import Spinner from "../../../shared/components/loadings/Spinner/Spinner";
import { startFormDataLoadingAntenna } from "../../actions/formData";
import AntennaModelInput from "../AntennaModelInput/AntennaModelInput";
import { Redirect } from "react-router";
import MeasurementSurfacesInput from "../MeasurementSurfacesInput/MeasurementSurfacesInput";
import { startLoadMeasurementSurface } from "../../actions/MeasurementSurfacesFetch";
import AntennaTypeHeightInput from "../AntennaTypeHeightInput/AntennaTypeHeightInput";
import IconUpload from "../../../shared/components/IconUpload/IconUpload";
import { isValidFile } from "../../../shared/helpers/formValidator";
import AntennaHeight from "../AntennaHeight/AntennaHeight";
import { config } from "../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const parameters = "";

const RequestNewForm = ({ forms }) => {
    const {
        handleSubmit,
        register,
        errors,
        watch,
        setError,
        clearErrors,
        control,
    } = useForm({
        defaultValues: { antennaModel: "" },
    });

    const dispatch = useDispatch();
    const { antennas } = useSelector((state) => state.formsData);
    const { data: measurementSurfaces } = useSelector(
        (state) => state.measurementSurfaces
    );
    const { loading, error, data } = useSelector((state) => state.newOrder);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);

    useEffect(() => {
        dispatch(startFormDataLoadingAntenna());
    }, [dispatch]);

    useEffect(() => {
        dispatch(startLoadMeasurementSurface());
    }, [dispatch]);

    const handleForm = async (data) => {
        dispatch(startSendNewOrder(data));
    };

    return (
        <div className="request-new__form">
            <h2>Datos del punto para el procesamiento PPP</h2>

            <form onSubmit={handleSubmit(handleForm)}>
                <div className="form__row form__row--file">
                    <label htmlFor="file">
                        Archivo de observación RINEX del punto (los formatos
                        aceptados son: .Z, .??d, .??o). Tamaño máximo permitido
                        20MB.
                    </label>
                    <div
                        style={{
                            marginTop: "0rem",
                            marginBottom: "1.3rem",
                        }}
                    >
                        <a
                            href={config.instructivoLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="icon-container icon-container--small">
                                <FontAwesomeIcon
                                    icon={faInfo}
                                    className="icon icon--small"
                                />
                            </div>
                            <span> </span>Instructivo de compresión y
                            descompresión de archivos RINEX
                        </a>
                    </div>

                    <input
                        className="uploadFile"
                        type="file"
                        name="file"
                        id="file-upload"
                        ref={register({
                            required: {
                                value: true,
                                message:
                                    "El archivo del punto de la antena es requisito",
                            },
                            validate: () => {
                                console.log("fileSize: ", fileSize);
                                console.log("fileName: ", fileName);

                                let validInput =
                                    "Error al seleccionar el archivo";
                                let archivo_limite_mb = 20;
                                if (
                                    !(
                                        fileSize >=
                                        1048576 * archivo_limite_mb
                                    ) &&
                                    isValidFile(fileName)
                                ) {
                                    validInput = true;
                                }
                                console.log(validInput);
                                return validInput;
                            }, // TODO : Validar tamaño y extension
                        })}
                        errors={errors}
                        onChange={(e) => {
                            setFileName(e.target.files[0]?.name);
                            setFileSize(e.target.files[0]?.size);
                            // TODO : Controlar la extension de los archivos a subir
                            let archivo_limite_mb = 20; // TODO : Consultar a una API el valor limite del archivo
                            if (
                                e.target.files[0].size >=
                                1048576 * archivo_limite_mb
                            ) {
                                setError("file", {
                                    type: "manual",
                                    message: `Tamaño de archivo excedido. Límite ${archivo_limite_mb} mb.`,
                                });
                            } else {
                                clearErrors("file");
                            }

                            if (!isValidFile(e.target.files[0]?.name)) {
                                setError("file", {
                                    type: "manual",
                                    message: `Extensión de archivo no válido.`,
                                });
                            } else {
                                clearErrors("file");
                            }
                        }}
                    />

                    <label htmlFor="file-upload" className="custom-file-upload">
                        <IconUpload />{" "}
                        <div className="container-text">
                            {" "}
                            <span>Seleccionar archivo :</span>{" "}
                            <span>
                                {fileName
                                    ? fileName
                                    : "Ningún archivo seleccionado"}
                            </span>{" "}
                        </div>
                    </label>

                    {errors["file"] && (
                        <div>
                            {" "}
                            <p className="form__error">
                                {" "}
                                {errors["file"].message}{" "}
                            </p>{" "}
                        </div>
                    )}
                </div>

                {forms.map((form) => (
                    <UserFormInput
                        label={form.label}
                        type={form.type}
                        placeholder={form.placeholder}
                        name={form.name}
                        register={register}
                        errors={errors}
                        validation={form.validation}
                        key={form.name}
                        maxlength={form.maxlength}
                    />
                ))}

                <AntennaModelInput
                    errors={errors}
                    antennas={antennas}
                    control={control}
                />

                <AntennaTypeHeightInput
                    errors={errors}
                    antennas={antennas}
                    control={control}
                    watch={watch}
                />

                <AntennaHeight
                    errors={errors}
                    antennas={antennas}
                    register={register}
                    control={control}
                    watch={watch}
                />

                {/* <div className='form__row'>
          <label htmlFor='antennaHeight'>Altura de antena [m]</label>
          <input 
            type='number'
            step='.001'
            name='antennaHeight'
            ref={ register(
              {
                required: {
                  value : true,
                  message : "La altura de la antena es requisito",
                }
              }
            )}
            errors={ errors }
          />
          { errors['antennaHeight'] && <div> <p className='form__error'> {errors['antennaHeight'].message} </p> </div> }
        </div> */}

                {/* <br/> */}

                <MeasurementSurfacesInput
                    errors={errors}
                    measurementSurfaces={measurementSurfaces}
                    control={control}
                />

                {/* <div 
          className='optional-form'
        >
          <h3
            onClick={ () => setHide( value => !value ) }
          >
            Añadir datos de uno o más puntos MÓVILES para procesamiento diferencial respecto de la BASE (opcional)

          </h3>

          <div className={ `${ hide ? 'hide' : ' '}` }>
            <p>Los archivos RINEX que se importen en esta sección se procesarán en forma relativa respecto de las coordenadas POSGAR07 resultantes de la BASE (no se utiliza PPP para la determinación de coordenadas en esta modalidad).</p>

            <div className='optional-form--upload'>
              <h4>Ingreso de un nuevo punto MÓVIL</h4>
              <p>Archivo de observación RINEX del punto MÓVIL (se procesará en forma diferencial al punto BASE) Los formatos aceptados son: .Z, .??d, .??o</p>

              <div>
                <p>
                  <span 
                    onClick={ () => { 
                      setContador( valor => valor + 1 );
                      setOpcionales( value => ( [ ...value, contador ] ) ) } }
                      className='icon-container'
                  >
                    <FontAwesomeIcon icon={ faPlus } className='icon' />
                  </span>
                Agregar punto móvil
                </p>
              </div>
            </div>

            <div className='optional-form--table'>
              <h4>Resumen de los archivos de los puntos MÓVILES ingresados</h4>
              <RequestNewFormOptionalFiles 
                register={ register }
                errors={ errors }
                antennas={ antennas }
                watch={ watch }
                opcionales={ opcionales }
                setOpcionales={ setOpcionales }
              />
            </div>
          </div>

        </div> */}

                {/* <hr /> */}

                {/* <div className='form__row form__row--agree'>
          <label htmlFor='antennaHeight'>Acepto que los resultados del procesamiento puedan ser utilizados por el IGN para la evaluación de productos y servicios cartográficos y/o geodésicos.</label>
          <input 
            type='checkbox'
            name='agree'
            ref={ register( {
              required: {
                value : true,
                message : "Aceptar el uso de archivos por parte del IGN es requisito"
              }
            } ) }
            errors={ errors }
          />
          { errors['agree'] && <div> <p className='form__error'> {errors['agree'].message} </p> </div> }
        </div> */}

                <button
                    className={loading ? "btn btn--disabled" : "btn"}
                    type="submit"
                    disabled={loading}
                >
                    {" "}
                    Registrar Solicitud{" "}
                </button>

                <br />
            </form>

            {loading && <Spinner />}
            {error && <p className="message__error">{error}</p>}
            {data && <Redirect to="/requests/request-new/success" />}
            {data && <p className="message__success">{data}</p>}
        </div>
    );
};

export default withData(parameters)(RequestNewForm);
