const withData = ( parameters ) => ( Component ) => {

  const forms = [
    {
      label: "Correo electrónico",
      type: "text",
      placeholder: "Correo electrónico",
      name: "email",
      validation: { 
        required: {
          value : true,
          message : "El correo electrónico es requisito"
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "El correo electrónico debe ser valido"
        }
      }
    },
  ]

  return( ( ) => {
      return <Component forms={ forms }></Component>
    }
  );

}

export default withData