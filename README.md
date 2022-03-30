# Bootcamp Full Stack Web Developer #

## Proyecto Final: "El Último & Me Voy" - Frontend

### EL ÚLTIMO & ME VOY

> *Este repositorio es la parte "Frontend" del proyecto final del Bootcamp, el cual hemos llamado: "El Último & Me Voy".*

"El Último & Me Voy" es una aplicación web de "*Blogging*" enfocada en temas relacionados con la programación y, más concretamente, con la programación web. 

En esta aplicación se brinda al usuario la posibilidad de leer, buscar o compartir cualquier tipo de artículo relacionado con la tecnología web que más le interese. Además, también tiene la posibilidad de hacerse miembro realizando el proceso de registro, y esto, le añadirá más funcionalidades, como: crear artículos y así contribuir a la plataforma, crear artículos en respuesta a otros artículos, seguir usuarios, tener seguidores, guardar artículos como favoritos, comentar artículos, recibir notificaciones en el correo electrónico, etc.


## Equipo

[![](https://contrib.rocks/image?repo=proyectojotazo/frontend-proyecto-final)](https://github.com/proyectojotazo/frontend-proyecto-final/graphs/contributors)

## Despliegue en producción

A modo de demostración, la aplicación se encuentra desplegada en AWS, en el siguiente enlace:

**[http://ec2-3-70-140-211.eu-central-1.compute.amazonaws.com/](http://ec2-3-70-140-211.eu-central-1.compute.amazonaws.com/)**

## Instrucciones

#### Instalar dependencias:

Antes de nada debemos usar el siguiente comando para instalar todas las dependencias del proyecto:

    npm install

#### Configurar variables de entorno:

Para configurar las variables de entorno, deberemos crear un archivo `.env` en la raíz del proyecto y añadir las variables de entorno proporcionadas en el archivo `.example.env`, con los valores que debamos usar.

Estructura del `.env`:

    	REACT_APP_API_BASE_URL=<URL Backend>
		REACT_APP_BASE_URL=<URL Frontend>

#### Iniciar proyecto:

Para iniciar el proyecto, usa el comando:

    npm start

> Esto iniciará el proyecto en el puerto configurado por defecto: `http://localhost:3000`

#### Crear build del proyecto

Para poder crear la carpeta build del proyecto para su posterior despliegue en el servidor de producción, usa el comando:

    npm run build

> Este comando genera la carpeta "build" dentro de la raíz del proyecto.

## Funcionalidades

La aplicación dispone de diferentes páginas o rutas públicas y privadas:

**- Públicas -**

- Home
- Búsqueda de artículos
- Detalle de artículos
- Perfiles de usuarios
- Recuperar contraseña

**- Privadas -**

- Crear artículo
- Mi cuenta

Componentes comunes en todas las páginas:

- Menú principal
	- Cambio de idioma (inglés y español)
	- Búsqueda
	- Crear artículo (accesible sólo estando logueado)
	- Home
	- Usuario (si no se está logueado mostrará un popup para: iniciar sesión, registrarse o recuperar contraseña. Cuando se ha iniciado sesión, muestra las opciones "Perfil" y "Cerrar sesión")
- Pié de página (muestra los miembros que han realizado este proyecto y links a sus redes)

Además, la aplicación tiene implementado SEO a nivel básico (título de cada página dinámico y descripción), internacionalización (i18n, con español e inglés añadido) y una página 404 en el caso de que se acceda a una ruta que no exista. También se añaden popups de confirmación para cuando se quiera eliminar algo, y se controlan los estados vacíos y de error de cada página, así como los mensajes de error de cada input. También se envían emails tales como: recuperar contraseña, un usuario realiza un comentario en tu artículo o un usuario que sigues, crea un artículo.

### Home:

Home sería la página principal que se presenta al entrar en la aplicación. En ella se muestra: un "header" a modo de portada, una barra de categorías disponibles, una barra de paginación y tipo de orden de artículos, y el catálogo de artículos general.

Por defecto mostrará artículos de todas las categorías disponibles, en la página 1 y con un orden de artículos de más recientes primero. Una vez cargados los artículos se podrá navegar entre las distintas categorías, páginas o cambiar el orden a mostrar.

Cada artículo presentado dispondrá de una información: imagen (si no se ha añadido, mostrará una imagen por defecto de "no image"), categorías, título, texto introductorio, tiempo que lleva publicado, opciones del artículo y el usuario creador del artículo.

Las opciones a mostrar en cada artículo dependen de si se está logueado o no, o si el artículo está creado por el usuario logueado o no:

- Si no se está logueado: Sólo mostrará el número de comentarios que tiene ese artículo y el icono que despliega las opciones disponibles para compartir en redes.

- Si se está logueado:
	- Si eres creador del artículo: Además de las opciones mencionadas, puedes eliminar el artículo o editar el artículo.
	- Si el artículo lo creó otro usuario: Cambiarán las opciones de eliminar el artículo o editarlo, por añadir a favoritos o crear un artículo en respuesta a ese artículo. Además aparecerá el botón de seguir o dejar de seguir al usuario que ha creado ese artículo.

Estando logueado o no, se puede hacer click sobre el usuario que ha creado el artículo y se le redirigirá a la página del perfil de ese usuario, la cual se detallará más adelante.

### Búsqueda de artículos:

Esta página es muy parecida al "Home", sólo que esta no muestra un "header" y muestra una barra de búsqueda.

Cuando se realiza una búsqueda, si hay artículos muestra al igual que ocurre en "Home", toda la información antes descrita. Si no hay artículos, avisa de que no se encontraron resultados, por lo que no mostrará la paginación, orden y categorías.

Al estar controlada la búsqueda desde el "backend", el texto introducido busca artículos que coincidan en título, introducción o contenido.

### Detalle de artículos:

Cada artículo tiene su página de detalle en la cual se expone toda la información antes descrita en las páginas donde se muestran los artículos y además se muestra el contenido de dicho artículo, comentarios (si los hubiera) y un formulario para realizar comentarios, si se estuviese logueado.

Los comentarios de los artículos pueden ser eliminados por el creador del artículo o por el creador de dicho comentario.

### Perfiles de usuarios:

Cada usuario tiene una página de perfil pública en la que se muestra la siguiente información:

- Avatar
- Nick
- Contador con el número de artículos creados, usuarios seguidores y seguidos
- Botón para seguir o dejar de seguir al usuario (si se está logueado)
- Menú para cambiar la vista que se mostrará más abajo, con las opciones: artículos, favoritos, seguidores y seguidos
- Información según la pestaña elegida en el menú

Si la página de perfil de usuario coincide con el usuario logueado, el botón "seguir/dejar de seguir" cambiará por el botón "Editar perfil", que llevará a la página "Mi Perfil", descrita más adelante.

### Recuperar contraseña:

Esta página es accesible desde el enlace que se enviaría al email del usuario que quiera recuperar su contraseña. En esta página se incluye un formulario para actualizar la contraseña del usuario y asignarle una nueva contraseña.

El usuario tendrá 1 hora para poder hacer uso de dicho enlace, ya que desde el backend se controla que el token proporcionado para el cambio de contraseña dure este tiempo.

### Crear artículo:

La página de crear artículo se reutiliza a su vez para crear un artículo en respuesta a otro y para editar cualquier artículo, cambiando de forma dinámica el título de esta y la información mostrada en ella. Sólo se puede acceder estando logueado.

Para crear un artículo se debe incluir el mínimo de información requerida desde el backend, pero se muestra un formulario para poder: añadir título, imagen destacada (se mostrará una vista previa de la imagen y un botón para limpiar el input y la vista previa y poder así cargar otra), introducción (hasta 150 carácteres"), selección de categorías, editor de texto enriquecido (WYSIWYG) para añadir el contenido del artículo y la posibilidad de programar el artículo para una fecha a elegir convirtiendo el artículo en "borrador" (al ser borrador no se publicará dicho artículo y la fecha debe ser posterior al momento de creación). El botón para crear al artículo cambiará de forma dinámica según si se crea el artículo, se programa para más adelante o se está editando.

### Mi cuenta:

A esta página puede accederse desde el menú principal, estando logueado. En ella se puede ver la información de la cuenta del usuario logueado y tiene un menú propio, para navegar en ella.

- Mi perfil: Muestra toda la información del usuario, se puede editar dicha información (incluida contraseña) y puede eliminarse la cuenta (con toda la información/artículos creados (excepto comentarios).
- Mis artículos: Muestra todos los artículos creados (publicados y borradores).
- Mis favoritos: Todos los artículos marcados como favoritos.
- Seguidores: Usuarios que te están siguiendo en este momento (puede accederse a sus perfiles haciendo click en ellos). Se pueden seguir o dejar de seguir desde aquí.
- Siguiendo: Usuarios que estás siguiendo. Se pueden dejar de seguir desde aquí también.

