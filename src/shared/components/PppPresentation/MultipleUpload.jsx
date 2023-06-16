import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { v4 as uuidv4 } from 'uuid';
// import { useSelector } from 'react-redux';

// import { fetchConToken, fetchFileConToken } from '../../../helpers/fetch';
import UserFormInput from "../../../users/components/UserFormInput/UserFormInput.component";

const MultipleUpload = () => {
    const { handleSubmit, register, errors, watch } = useForm();
    // const { antennas } = useSelector( state => state.formsData );

    const [secundarios, setSecundarios] = useState([]);
    const [contador, setContador] = useState(1);

    const handleForm = async (data) => {
        console.log("Datos del formulario", data);
        // console.log( 'Datos de input-1', data['input-1'] );

        // const formData = new FormData( );
        // formData.append( 'file', data.file[0] );
        // const id = uuidv4( );
        // formData.append( 'id', id );

        // const res = await fetchFileConToken( 'files', formData, 'POST' );
        // const resJson = await res.json( );
        // console.log( 'Respuesta del archivo enviado: ', resJson );

        // if( resJson.status === 'success' ){
        //   console.log('Perfecto');

        //   const antenna = antennas.find( antenna => antenna.name === data.antennaModel );
        //   const height_type = antenna.height_types.find( height_type => height_type.name === data.antennaTypeHeight ).id;

        //   const order = {
        //     id,
        //     fileId: id,
        //     name: data.name_base,
        //     antennaId: antenna.id,
        //     antennaHeightTypeId: height_type,
        //     height: data.antennaHeight,
        //     movingPoints: [], // TODO : Armar funcion que devuelva los moving point armados
        //   }

        //   console.log(order);
        //   const resOrder = await fetchConToken( 'orders',
        //   order,
        //   'POST',
        //   );
        //   const resOrderJson = await resOrder.json();
        //   console.log( resOrderJson );
        // }
    };

    console.log("Controlando el archivo principal", watch("main-input"));

    return (
        <div>
            <hr />
            <h1>Multiple Upload</h1>

            <form onSubmit={handleSubmit(handleForm)}>
                <h2>Archivo Principal</h2>
                <UserFormInput
                    label="Archivo Principal"
                    type="file"
                    placeholder="Subir archivo principal"
                    name="main-input"
                    register={register}
                    errors={errors}
                    validation={{
                        required: {
                            value: true,
                            message:
                                "El archivo del punto de la antena es requisito",
                        },
                    }}
                    // key={ form.name }
                />

                <h2>Archivos Secundarios</h2>

                {secundarios.map((secundario) => (
                    // Construir un componente nuevo para tabla con funcionalidad de borrar
                    <UserFormInput
                        label="Archivo Secundario"
                        type="file"
                        placeholder="Subir archivo"
                        name={`input-${secundario}`}
                        register={register}
                        errors={errors}
                        validation={{
                            required: {
                                value: true,
                                message:
                                    "El archivo del punto secundario de la antena es requisito",
                            },
                        }}
                        key={secundario}
                        // TODO : Pasar setSecundario para Poder borrar componente hijo desde el mismo
                    />
                ))}
                <button
                    onClick={() => {
                        setContador((valor) => valor + 1);
                        setSecundarios((value) => [...value, contador]);
                    }}
                >
                    agregar
                </button>
                <p>''</p>

                <button type="submit">Subir</button>
            </form>
            <hr />
        </div>
    );
};

export default MultipleUpload;
