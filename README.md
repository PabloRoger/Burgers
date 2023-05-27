# ¿Cómo empezar?
Lo primero de todo, es ejecutar **XAMPP** para importar la base de datos en **phpmyadmin**.

La base de datos se encuentra en `src/database/db.sql`, está ya preparada para solamente importarla y que funcione correctamente.

Después en el IDE o terminal, hay que acceder a la ubicación de la carpeta del proyecto y utilizar el comando `npm run start`

Si por algún casual no estuviera algun paquete instalado, si en la terminal introducimos `npm install`, se instalarán todas las dependencias necesarias para el proyecto.

## Dirección
La web está alojada en el localhost en el puerto 3000
`http://localhost:3000/`

## Usuario
En la base de datos se encuentran dos usuarios creados:
`Usuario: admin | Contraseña: 123`
`Usuario: pablo | Contraseña: $2a$08$7O2KIy34D3PDl85emvHZtOdc658BpISxM3OBKpffjwceAJhloS1om`

La contraseña de "admin" no funciona, por el método de autentificación mediante encriptación que tengo incorporado, lo he dejado para que se vea la diferencia entre un usuario con este metodo incorporado y otro sin.

Realmente, ambas contraseñas son las mismas: 123, solamente que una está encriptada y otra no.
Por ende, si se quiere iniciar sesión deberá ser de la siguiente forma:

**Usuario: pablo
Contraseña: 123**

(aunque en base de datos la contraseña esté encriptada, a la hora de ingresar a la web, habrá que poner la contraseña escrita de manera normal, de manera interna hace la comprobación si la contraseña escrita normal, coincide con la encriptada en la base de datos)
