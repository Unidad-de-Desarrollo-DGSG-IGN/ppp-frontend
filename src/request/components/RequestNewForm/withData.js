const withData = ( parameters ) => ( Component ) => {
  
  const forms = [
    {
      label: "Nombre del punto BASE (Entre cuatro y nueve caracteres alfanuméricos)",
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
          value: 8,
          message: "Nombre base largo"
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