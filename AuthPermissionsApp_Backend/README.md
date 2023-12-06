# WebServer + RestServer

---

## \* Pasos a seguir:

- https://gist.github.com/Klerith/edd976c04e12c75a3de3e85a888ba7e2

- Ejecutar `npm install` para reconstruir los módulos de Node.

- Ir a [MongoDB Atlas](https://www.mongodb.com/atlas/database) ya que el backend graba en MongoDB y hacer la creación del Cluster y las configuraciones necesarias. Luego ir a Database Access y si no tenemos un usuario utilizando eso entonces creamos uno nuevo y tener a la mano el usuario y la contraseña autogenerada. Cuando ya se tenga eso renombrar el .example.env a .env y se irán completando los datos que faltan. Ahora en MongoDB en el cluster creado ir a conectar y conectarse usando MongoDB Compass. Si ya se tiene el MongoDB Compass entonces copiar esa conexión que nos dan e ir complentado el .env en MONGODB_CNN y esa password que se copió anteriormente reemplazarla en \<password>, luego el SECRETORPRIVATEKEY es utilizado por el paquete de JsonWebToken (JWT) que tenemos definido en el proyecto que nos servirá para firmar y validar los JWT (colocar un texto random y complejo), luego lo que se pudo en MONGODB_CNN pegarlo también en el MongoDB Compass. Solo faltaría completar el CLOUDINARY_URL que es lo que nos da Cloudinary y pegarla.

- Las imágenes trabajan de dos formas en este backend las cuales son:
  - Trabajar de forma local en el file system
  - Usar un servidor aparte para las imágenes [Cloudinary](https://cloudinary.com/) y tener a la mano el API Environment variable
- Con todo esto podemos abrir una nueva instancia de la terminal, ir a esta carpeta y para probar la aplicación se utilizará `npm start` y ya debería correr el backend y si hay algún problema con el puerto por ejemplo entonces cambiarlo y correr de nuevo con `npm start`

- En Postman se verá una variable de entorno configurada como `{{url}}/api/......` entonces ir a Environmets y crear un nuevo environmet llamado `Desarrollo` y crear la variable `url` y su current value será `http://localhost:8080` y guardar los cambios. Luego es importante seleccionar el environmet con el cual se estará trabajando.

- Ahora en MongoDB Compass ir a la base de datos que se creó y crear una nueva colección que serán los roles y se llamará `roles` (con ese nombre para que funcione correctamente) luego entrar y añadir data -> insertar documento:

  - Crear primer role:

  ```
  {
    "rol": "USER_ROLE"
  }
  ```

  - Crear segundo role:

  ```
  {
    "rol": "ADMIN_ROLE"
  }
  ```

  - Con los dos roles creados ir a postman y ya deberíamos tener una respuesta del backend

- En React Native se tendrá que colocar el IP en vez del localhost en postman quedando así `http://COLOCAR-IP:8080` y si se despliega entonces crear un nuevo environmet ahora de Producción y colocar ahí la ruta y si termina en / entonces quitarlo ya que se podría generar al hacer las peticiones de esta forma `{{url}}/api//......`

- Ahora con eso ya se tendría todo para poder trabajar de forma normal el Backend con el Frontend.
