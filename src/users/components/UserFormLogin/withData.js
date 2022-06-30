const withData = ( parameters ) => ( Component ) => {

  const forms = [
    {
      label: "Correo electrónico",
      type: "email",
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
    {
      label: "Contraseña",
      type: "password",
      placeholder: "Contraseña",
      name: "password",
      validation: { 
        required: {
          value : true,
          message : "La contraseña es requisito"
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