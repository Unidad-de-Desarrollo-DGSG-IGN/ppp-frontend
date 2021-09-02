# PPP Frontend

---
---

## Introducción

---

## Objetivo

---

## Alcance

---

## Requerimientos funcionales

---

## Requerimientos no funcionales

Tecnologias usadas

* React
* React Hooks
* React Form Hooks
* React Table
* CSS y SASS
  * CSS Grid
  * CSS Flexbox
  * SASS con sintaxis SCSS

---

### Documentacion de la API utilizada

#### Test Server

* Endpoint: 
  * URL: `http://172.20.201.39/ppp-test/health-check`
  * Metodo: `GET`
* Datos enviados - Request:
  * `-`
* Datos recibidos - Response:
  ```js
  {
    "ppp-backend": "ok",
    "rand": 1
  }
  ```


#### Registro de usuario

* Endpoint
  * URL: `http://172.20.201.39/ppp-test/users`
  * Metodo: `POST`
* Datos enviados - Request:
  ```js
  {
    "id": "33256072-d57d-4f5a-8f38-b98f5fbf91e6",
    "firstname": "Daniel",
    "lastname": "Fernandez",
    "email": "test@test.com",
    "password": "test"
  }
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "message": "The user has been created"
    }
  }
  ```

#### Logueo de usuario

* Endpoint
  * URL: `http://localhost/ppp-test/auth`
  * Metodo: `POST`
* Datos enviados - Request:
  ```js
  {
    "username": "test@test.com",
    "password": "test"
  }
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "token": {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsInVzZXJfaWQiOiIzMzI1NjA3Mi1kNTdkLTRmNWEtOGYzOC1iOThmNWZiZjkxYTcifQ.mH27iKN7zN3i-Y-B6-5m9whHvc9O2ViGajIUcLqAwsQ",
            "access_type": "bearer",
            "expiration_date": "20211231T235959"
        },
        "user": {
            "userId": "33256072-d57d-4f5a-8f38-b98f5fbf91a7",
            "username": "alan@ign.ar"
        },
        "message": "The token has been generated"
    }
  }
  ```

#### Listado de antenas

* Endpoint
  * URL: `http://172.20.201.39/ppp-test/antennas`
  * Metodo: `GET`
* Datos enviados - Request:
  * Header
  ```
  Authorization: 'Bearer <token>'
  ```
  * Body
  ```js
  -
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "antennas": [
            {
                "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                "name": "Trimbre Zephyr model 2 (TRM57970.00)",
                "height_types": [
                    {
                        "id": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
                        "name": "Inclinada a la marca o muesca indicada por el fabricante"
                    }
                ]
            },
            {
                "id": "374492d7-6a0f-48cd-8485-2568843d4022",
                "name": "Tomar datos desde encabezado del archivo RINEX",
                "height_types": []
            },
            {
                "id": "9c67e0de-d3da-4ae4-91f9-de52d669a4c8",
                "name": "Trimbre Zephyr model 3 (TRM67970.00)",
                "height_types": [
                    {
                        "id": "aff87aa3-9841-4330-ac7e-2b0cdcb69fa3",
                        "name": "Vertical a la base de la antena o ARP (Antenna Reference Point)"
                    }
                ]
            }
        ],
        "message": "Antennas list has been retrieve"
    }
  }
  ```

#### Crear Ordenes

* Endpoint
  * URL: `http://localhost/ppp-test/orders`
  * Metodo: `POST`
* Datos enviados - Request:
  * Header
  ```
  Authorization: 'Bearer <token>'
  ```
  * Body
  ```js
  {
    "id": "00f859bd-5b60-470c-9170-1fd1dcc4cbc0",
    "fileId": "79e7371c-9848-4213-a664-50930b203e8b",
    "name": "Test",
    "antennaId": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
    "antennaHeightTypeId": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
    "height": "123",
    "movingPoints": [
      {
        "id": "5db33aa1-d334-4603-973f-b8eaea48f71d",
        "fileId": "79e7371c-9848-4213-a664-50930b203e8b",
        "name": "asdasd",
        "antennaId": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
        "antennaHeightTypeId": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
        "height": "123"
      },
      {
        "id": "eab51241-c3a5-40c4-ab3a-cfc60d1241a1",
        "fileId": "79e7371c-9848-4213-a664-50930b203e8b",
        "name": "xxxxxxx",
        "antennaId": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
        "antennaHeightTypeId": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
        "height": "123"
      }
    ]
  }
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "order": {
            "id": "00f859bd-5b60-470c-9170-1fd1dcc4cbc0",
            "name": "Test",
            "heigth": "123",
            "creationDate": "2021-06-03 10:02:34",
            "status": "PROCESSING",
            "user": {
                "id": "33256072-d57d-4f5a-8f38-b98f5fbf91e6",
                "firstname": "Daniel",
                "lastname": "Fernandez",
                "email": "test@test.com"
            },
            "file": {
                "id": "79e7371c-9848-4213-a664-50930b203e8b",
                "originalName": "logoKT.PNG",
                "size": "3677",
                "extension": "png"
            },
            "antenna": {
                "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                "name": "Trimbre Zephyr model 2 (TRM57970.00)",
                "antennaHeightType": {
                    "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                    "name": "Trimbre Zephyr model 2 (TRM57970.00)"
                }
            },
            "movingPoints": [
                {
                    "id": "5db33aa1-d334-4603-973f-b8eaea48f71d",
                    "fileId": "79e7371c-9848-4213-a664-50930b203e8b",
                    "name": "asdasd",
                    "antennaId": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                    "antennaHeightTypeId": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
                    "heigth": "123",
                    "file": {
                        "id": "79e7371c-9848-4213-a664-50930b203e8b",
                        "originalName": "logoKT.PNG",
                        "size": "3677",
                        "extension": "png"
                    },
                    "antenna": {
                        "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                        "name": "Trimbre Zephyr model 2 (TRM57970.00)",
                        "antennaHeightType": {
                            "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                            "name": "Trimbre Zephyr model 2 (TRM57970.00)"
                        }
                    }
                },
                {
                    "id": "eab51241-c3a5-40c4-ab3a-cfc60d1241a1",
                    "fileId": "79e7371c-9848-4213-a664-50930b203e8b",
                    "name": "xxxxxxx",
                    "antennaId": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                    "antennaHeightTypeId": "88b5c9ca-8622-4b9a-aab1-a49a99909966",
                    "heigth": "123",
                    "file": {
                        "id": "79e7371c-9848-4213-a664-50930b203e8b",
                        "originalName": "logoKT.PNG",
                        "size": "3677",
                        "extension": "png"
                    },
                    "antenna": {
                        "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                        "name": "Trimbre Zephyr model 2 (TRM57970.00)",
                        "antennaHeightType": {
                            "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                            "name": "Trimbre Zephyr model 2 (TRM57970.00)"
                        }
                    }
                }
            ]
        },
        "message": "Order details has been retrieve"
    }
  }
  ```

#### Consultar listado de Ordenes

* Endpoint
  * URL: `http://localhost/ppp-test/orders`
  * Metodo: `GET`
* Datos enviados - Request:
  * Header
  ```
  Authorization: 'Bearer <token>'
  ```
  * Body
  ```js
  -
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "orders": [
            {
                "id": "31d1e206-82c8-4c8c-a1cd-539c80f0bcd6",
                "userId": "33256072-d57d-4f5a-8f38-b98f5fbf91a7",
                "fileId": "31d1e206-82c8-4c8c-a1cd-539c80f0bcd6",
                "name": "prob",
                "antennaId": "9c67e0de-d3da-4ae4-91f9-de52d669a4c8",
                "antennaHeightTypeId": "aff87aa3-9841-4330-ac7e-2b0cdcb69fa3",
                "height": "10",
                "creationDate": "2021-05-19 14:48:09",
                "status": "PROCESSING"
            },
            {
                "id": "3bad04bf-cf38-4956-9ca8-306eb1899ec9",
                "userId": "33256072-d57d-4f5a-8f38-b98f5fbf91a7",
                "fileId": "3bad04bf-cf38-4956-9ca8-306eb1899ec9",
                "name": "hgfd",
                "antennaId": "9c67e0de-d3da-4ae4-91f9-de52d669a4c8",
                "antennaHeightTypeId": "aff87aa3-9841-4330-ac7e-2b0cdcb69fa3",
                "height": "14",
                "creationDate": "2021-05-19 14:48:10",
                "status": "PROCESSING"
            }
        ],
        "message": "Orders list has been retrieve"
    }
  }
  ```

#### Consultar Orden en particular

* Endpoint
  * URL: `http://localhost/ppp-test/orders/<orden_id>`
  * Metodo: `GET`
* Datos enviados - Request:
  * Header
  ```
  Authorization: 'Bearer <token>'
  ```
  * Body
  ```js
  -
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "order": {
            "id": "00f859bd-5b60-470c-9170-1fd1dcc4cbc0",
            "name": "Test",
            "heigth": "123",
            "user": {
                "id": "33256072-d57d-4f5a-8f38-b98f5fbf91e6",
                "firstname": "Daniel",
                "lastname": "Fernandez",
                "email": "test@test.com"
            },
            "file": {
                "id": "79e7371c-9848-4213-a664-50930b203e8b",
                "originalName": "index.html",
                "size": "1339",
                "extension": "html"
            },
            "antenna": {
                "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                "name": "Trimbre Zephyr model 2 (TRM57970.00)",
                "antennaHeightType": {
                    "id": "06b25aa9-4264-4ca2-9b10-8460cd40ab78",
                    "name": "Trimbre Zephyr model 2 (TRM57970.00)"
                }
            }
        },
        "message": "Order details has been retrieve"
    }
  }
  ```


#### Subir archivos

* Endpoint
  * URL: `http://172.20.201.39/ppp-test/files`
  * Metodo: `POST`
* Datos enviados - Request:
  * Header
  ```
  Authorization: 'Bearer <token>'
  Content-Type: multipart/form-data // Solo por postman. Por Fetch lo hace automaticamente
  ```
  * Body
  ```js
  // Como form-data
  id: <id>
  file: <file> 
  ```
* Datos recibidos - Response:
  ```js
  {}
  ```

#### Informacion del Usuario
> Consulta: Cualquier usuario puede preguntar sobre cualquier id de otro usuario?

* Endpoint
  * URL: `http://172.20.201.39/ppp-test/users/:id`
  * Metodo: `GET`
* Datos enviados - Request:
* * Header
  ```
  Authorization: 'Bearer <token>'
  ```
  * Body
  ```js
  -
  ```
* Datos recibidos - Response:
  ```js
  {
    "status": "success",
    "data": {
        "user": {
            "id": "33256072-d57d-4f5a-8f38-b98f5fbf91a7",
            "firstname": "Alan",
            "lastname": "Mejia",
            "email": "alan@ign.ar"
        },
        "message": "User details has been retrieve"
    }
  }
  ```



---

## Forma de colaborar con el proyecto

Para colaborar con el proyecto se debera seguir los siguientes pasos:

* Tener instalado [GIT](https://git-scm.com/downloads) en su computadora.
* Clonar el proyecto mediante GIT
  ```bash
  git clone https://github.com/Unidad-de-Desarrollo-DGSG-IGN/ppp-frontend.git
  ```
* Moverse dentro del proyecto
  ```bash
  cd ppp-frontend
  ```
* Crear una rama que indique el *feature* a desarrollar.
  ```bash
  git checkout -b <nombre del feature>
  ```
* Dentro de esa rama empezar a desarrollar el *feature*.
  * Por lo general al crear la rama se mueve automaticamente a dicha rama.
  * En otro caso:
    * Listar los nombres de las ramas disponibles
    ```bash
    git branch -a
    ```
    * Buscar y cambiar a la rama creada para desarrollar el feature
    ```bash
    git checkout <nombre del feature>
    ```
* Una vez desarrollado el *feature*, hacer el seguimiento mediante git
  ```bash
  git add .
  git commit -m"Descripcion breve del Feature"
  git push
  ```
* Una vez pusheado la rama, se procedera a pedir un **Pull Request** desde la pagina del GitHub.
  * Esta accion debera ser aprobada por almenos una persona perteneciente al proyecto.
  * Una vez aporbado se adicionara a la rama *main*.

---

##  Desarrollo y despliegue del proyecto

> El proyecto se inicio mediante el comando: `npx create-react-app ppp-frontend`. Este comando solo fue usado para iniciar el proyecto.

### Requsitos mínimos para el desarrollo

Se debe tener instalado los siguientes softwares:

* [Nodejs](https://nodejs.org/es/)
* [Yarn](https://yarnpkg.com/getting-started/install)
  * Una vez instalado Nodejs, se procede a instalar de forma global Yarn
  * `npm install -g yarn`

### Uso del entorno de create react app

* Una vez clonado el proyecto, éste contendra los archivos necesarios del desarrollo.
* Para instalar las dependencias necesarias que utiliza el proyecto se procede con la instruccion:
  ```bash
  yarn
  ```
* Una vez instalado las dependencias del proyecto ya se pueden utilizar los scripts que ofrece el entorno.
  * `yarn start`
  * `yarn test`
  * `yarn build`
  * `yarn eject`

#### Scripts disponibles

En el directorio del proyecto, se pueden correr los siguiente comandos:

##### `yarn start`

La aplicacion de React se ejecutara en modo de desarrollador
Abrir [http://localhost:3000](http://localhost:3000) para verlo en el navegador

La pagina se refrescara automáticamente si se crean o guardan cambios en el codigo.
Los errores se veran en la consola del navegador y desde donde se lanzo `yarn start`.

##### `yarn test`

Lanzar el sitio en modo testing interactivo *watch*.

##### `yarn build`

Construye la aplicacion para produccion en la carpeta `build`.
Se realizan optimizaciones necesarias.
La aplicacion esta lista para desplegarla.

---

## Descripcion del Desarrollo de la Aplicacion Web

* Descripción detallada de los componentes (si se conecta con una API, indicar endpoint, parámetros del request y parámetros de response)

---
---

## Testeo de Usabilidad

* Se testea la aplicacion web y se recogen los puntos a corregir y mejorar
* Se evaluara cada punto en: (Hacer link de cada pagina)
  * Diseño visual
  * Faltas ortograficas
  * Contenido
  * Experiencia de usuario
* Se debe testear por:
  * Grupo interno de desarrollo
  * Grupo del Area del proyecto
  * Posibles usuario
  * Publico general

---

### Evaluacion General


##### Diseño visual

* [ ] Tiene que ser Responsive Design
* [ ] Probar en distintos Navegadores
* [ ] Cambiar favicon de la aplicación por logo de IGN

##### Ortografia

* [ ] Revisar toda ortografia del contenido

##### Contenido

* [ ] Falta tooltips para mas informacion para el usuario

##### Experiencia de Usuario

* [ ] Falta devolucion al usuario ante determindas acciones
* [ ] Falta algunas animaciones para transiciones de las distintas acciones que realiza el usuario y la aplicacion web.

##### Funcionalidad

* [ ]


### Bienvenida

---

#### Login

<img src='./img_readme/bienvenida_login.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ Indicar al usuario si existe error en login (por ejemplo: al poner mal el email y la contraseña) ] 

##### Funcionalidad

* [ ] Falta desarrollar la funcionanlidad del boton 'Recordarme'.

---

#### Registro de Usuario

<img src='./img_readme/bienvenida_registro.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 

---

#### Recuperar contraseña

<img src='./img_readme/bienvenida_recuperarContrasena.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 



### Espacio de trabajo

---

#### Menu de navegacion

<img src='./img_readme/trabajo_menuNavegacion.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 

---

#### Menu de Usuario

<img src='./img_readme/trabajo_menuUsuario.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 

---

#### Listado de Ordenes

<img src='./img_readme/trabajo_ordenes.png' >

##### Diseño visual

* [ ] La tabla de ordenes tiene que ser Responsive Design
* [ ] Mejorar la parte visual de que Modo estan ordenados los items
* [ ] Quitar el campo de filtro de búsqueda principal (el de arriba de todo a la izquierda)
* [ ] Quitar el campo de texto donde permite ingresar el número de página al que se desea ir

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] El estado debe de mostrar una devolucion mas amigable con el usuario
* [ ] Tarda en cargarse inicialmente todas las ordenes
* [ ] El filtro de búsqueda por fecha debería proponer un calendario
* [ ] El filtro de búsqueda por estado debería proponer un combo con los estados posibles
* [ ] Modificar el título de la columna "Descarga" por "Informe"

##### Funcionalidad

* [ ] No funciona correctamente los botones de **Anterior** y **Siguiente**.
* [ ] No se ordena correctamente las fechas

---

#### Detalle de Orden

<img src='./img_readme/trabajo_ordenDetalle.png' >

##### Diseño visual

* [ ] El boton de descarga de los archivos tiene que estar acomodado y tener un tamaño coherente con su contexto.

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] Si son archivos pesados a descargar, el pop-up tarda en abrirse.
* [ ] 

##### Funcionalidad

* [ ] 


---

#### Crear ordenenes

<img src='./img_readme/trabajo_ordenNuevaTitulo.png' >
<img src='./img_readme/trabajo_ordenNueva.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] Permitir subir solo archivos con las extensiones correctas (*.Z, *.??d, *.??o)
* [ ] Controlar que el peso del archivo que se intenta subir no supere un máximo

---

#### Informacion del Usario

<img src='./img_readme/trabajo_usuarioInfo.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 

---

#### Pie de Pagina

<img src='./img_readme/trabajo_footer.png' >

##### Diseño visual

* [ ] 

##### Ortografia

* [ ] 

##### Contenido

* [ ] 

##### Experiencia de Usuario

* [ ] 
