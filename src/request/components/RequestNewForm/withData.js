const withData = ( parameters ) => ( Component ) => {
  
  const forms = [
    {
      label: "Nombre del punto BASE (entre cuatro y nueve caracteres alfanuméricos)",
      type: "text",
      placeholder: 'Nombre del punto BASE',
      name: "name_base",
      validation: {
        required: {
          value: true,
          message: "Nombre del punto BASE es requisito"
        },
        minLength: {
          value: 4,
          message: "Nombre del punto BASE es corta"
        },
        maxLength:{
          value: 9,
          message: "Nombre del punto BASE largo"
        },
        pattern: {
          value: /^[a-z0-9]+$/i,
          message: "No es alfa"
        }
      }
    },
  ]

  return( ( ) => {
      return <Component forms={ forms }></Component>
    }
  );
}

export default withData;