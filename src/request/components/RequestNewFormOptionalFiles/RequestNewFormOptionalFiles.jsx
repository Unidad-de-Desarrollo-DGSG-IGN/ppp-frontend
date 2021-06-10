import React from 'react';
import RowOptionalFiles from '../RowOptionalFiles/RowOptionalFiles';

const RequestNewFormOptionalFiles = ( { setOpcionales, opcionales, register, errors, antennas, watch } ) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Archivo
          </th>
          <th>
            Nombre (opcional) Cuatro caracteres alfanuméricos
          </th>
          <th>
            Modelo de antena
          </th>
          <th>
            Tipo de altura de antena
          </th>
          <th>
            Altura de antena [m]
          </th>
          <th>
            Eliminar
          </th>
        </tr>

        {/* TODO : Iteacion de componente ROW */}
        {
          opcionales.map( opcional => (
            <RowOptionalFiles
              register={ register }
              errors={ errors }
              antennas={ antennas }
              watch={ watch }
              key={ opcional }
              opcional={ opcional }
              setOpcionales={ setOpcionales }
            /> 
          ) )
        }
      </thead>
      <tbody>

      </tbody>


    </table>
  )
}

export default RequestNewFormOptionalFiles;
