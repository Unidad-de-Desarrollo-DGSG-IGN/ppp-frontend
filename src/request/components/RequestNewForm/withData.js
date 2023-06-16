const withData = (parameters) => (Component) => {
    const forms = [
        {
            label: "Nombre del punto (entre cuatro y nueve caracteres alfanuméricos)",
            type: "text",
            placeholder: "Nombre del punto",
            name: "name_base",
            validation: {
                required: {
                    value: true,
                    message: "Nombre del punto es requisito",
                },
                minLength: {
                    value: 4,
                    message: "Nombre del punto es corto",
                },
                maxLength: {
                    value: 9,
                    message: "Nombre del punto largo",
                },
                pattern: {
                    value: /^[a-z0-9]+$/i,
                    message: "No es alfanúmerico",
                },
            },
        },
        {
            label: "Descripción del proyecto (opcional)",
            type: "text",
            placeholder: "Descripción del proyecto",
            name: "project",
            validation: {
                maxLength: {
                    value: 100,
                    message: "Descripción del proyecto largo",
                },
                // pattern: {
                //   value: /^[a-z0-9]+$/i,
                //   message: "No es alfanúmerico"
                // }
            },
            maxlength: 100,
        },
    ];

    return () => {
        return <Component forms={forms}></Component>;
    };
};

export default withData;
