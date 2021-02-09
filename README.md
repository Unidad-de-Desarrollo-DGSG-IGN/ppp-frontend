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



