const withData = ( parameters ) => ( Component ) => {
  // data
  const forms = [
    {
      label: "Archivo de observación RINEX del punto BASE (los formatos aceptados son: .Z, .??d, .??o)",
      type: "file",
      name: "file",
      validation: {
        required: {
          value : true,
          message : "El archivo del punto BASE de la antena es requisito"
        },
      }
    },
    {
      label: "Nombre del punto BASE (opcional) Cuatro caracteres alfanuméricos",
      type: "text",
      placeholder: 'Nombre de la Base',
      name: "name_base",
      validation: {
        required: {
          value: true,
          message: "Nombre de la base es requisito"
        },
        minLength: {
          value: 4,
          message: "Nombre base corta"
        },
        maxLength:{
          value: 4,
          message: "Nombre base largo"
        },
        pattern: {
          value: /^[a-z0-9]+$/i,
          message: "No es alfa"
        }
      }
    },
    // {
    //   label: "Modelo de antena",
    //   type: "text",
    //   placeholder: 'Nombre de la antena',
    //   name: "name_antena",
    //   validation: {
    //   }
    // },
    // {
    //   label: "Tipo de altura de antena",
    //   type: "text",
    //   placeholder: 'Tipo de altura de antena',
    //   name: "tipo_antena",
    //   validation: {
    //   }
    // },
    // {
    //   label: "Altura de antena [m]",
    //   type: "text",
    //   placeholder: 'Altura [m]',
    //   name: "altura_antena",
    //   validation: {
    //     pattern: {
    //       value: /^[0-9]*$/i,
    //       message: "No es numerico"
    //     },
    //     required: {
    //       value : true,
    //       message : "La altura de la antena es requisito"
    //     },
    //   }
    // },
    // {
    //   label: "Acepto que los resultados del procesamiento puedan ser utilizados por el IGN para la evaluación de productos y servicios cartográficos y/o geodésicos.",
    //   type: "checkbox",
    //   name: "agree",
    //   validation: {
    //     required: {
    //       value : true,
    //       message : "Aceptar el uso de archivos por parte del IGN es requisito"
    //     },
    //   }
    // },
  ]

  return( ( ) => {
      return <Component forms={ forms }></Component>
    }
  );
}

export default withData;