# Entidades

Se han creado 4 entidades

Entidad technicians
    -techId
    -firstName
    -lastName

Entidad laboratories
    -labId
    -labName

Entidad projects
    -projectId
    -projectName

Entidad hoursRegister
    -hoursRegisterId
    -day
    -techId
    -labId
    -projectId

** Relación Many to Many donde la tabla hoursRegister hace de enlace con el resto de entidades technicians, laboratories y projects.


## Inicialización del sistema

Ejecutar los siguientes comandos:

bun install
bunx prisma db push


## Rellenado de datos de prueba

Ejecutar el siguiente comando:

bun prisma/seed.ts

o también:

bunx prisma db seed


## End points GET

Se ha creado los diferentes métodos GET:

- Get All registers -> GET http://localhost:8888/registers -> devuelve todos los registros de la entidad hoursRegister.
- Get register by id -> GET http://localhost:8888/registers/:id -> devuelve el registro del hoursRegisterId indicado.
- Get All technicians -> GET http://localhost:8888/technicians -> devuelve todos los registros de la entidad technicians.
- Get technician by id -> GET http://localhost:8888/technicians/:id -> devuelve el technician del techId indicado.
- Get All laboratories -> GET http://localhost:8888/laboratories -> devuelve todos los registros de la entidad laboraotires.
- Get laboratory by id -> GET http://localhost:8888/laboratories/:id -> devuelve el laboratory del labId indicado.
- Get All projects -> GET http://localhost:8888/projects -> devuelve todos los registros de la entidad projects.
- Get laboratory by id -> GET http://localhost:8888/projects/:id -> devuelve el project del projectId indicado.


## End points POST

Se ha creado los diferentes métodos Post:

- POST Add new register -> POST http://localhost:8888/registers -> Añade un nuevo registro a la entidad hoursRegister.
- POST Add new technician -> POST http://localhost:8888/technicians -> Añade un nuevo technician a la entidad technicians.
- POST Add new laboratory -> POST http://localhost:8888/laboratories -> Añade un nuevo laboratory a la entidad laboraotires.
- POST Add new project -> POST http://localhost:8888/projects -> Añade un nuevo project a la entidad projects.


## End points PUT

Se ha creado los diferentes métodos PUT:

- Update register -> PUT http://localhost:8888/registers/:id -> Se actualiza el registro de la entidad hoursRegister del id indicado.
- Update technician -> PUT http://localhost:8888/technicians/:id -> Se actualiza el technician a la entidad technicians del id indicado.
- Update laboratory -> PUT http://localhost:8888/laboratories/:id -> Se actualiza el laboratory a la entidad laboraotires del id indicado.
- Update project -> PUT http://localhost:8888/projects/:id -> Se actualiza el project a la entidad projects del id indicado.


## End points DELETE

Se ha creado los diferentes métodos Delete:

- Delete register -> DELETE http://localhost:8888/registers/:id -> Se elimina el registro de la entidad hoursRegister del id indicado.

- Delete technician -> Se deja comentado en el código. Se decide no utilizarlo puesto que el schema de la base de datos no permite borrar o elimninar un technician que forme parte ya de un registro de la entidad hoursRegister. En caso de querer cambiar el nombre del technician se puede realizar un PUT (Update).

- Delete laboratory -> Se deja comentado en el código. Se decide no utilizarlo puesto que el schema de la base de datos no permite borrar o elimninar un laboratory que forme parte ya de un registro de la entidad hoursRegister. En caso de querer cambiar el nombre del laboratory se puede realizar un PUT (Update).

- Delete project -> Se deja comentado en el código. Se decide no utilizarlo puesto que el schema de la base de datos no permite borrar o elimninar un project que forme parte ya de un registro de la entidad hoursRegister. En caso de querer cambiar el nombre del project se puede realizar un PUT (Update).


## Entregable

Se han añadido al git del proyecto los dos ficheros .json del thunder client. Estos ficheros incluyen consultas de cada end point creado.

thunder-collection_hours-laboratories-api errors examples.json -> Consultas de end point que provocan errores de ejemplo.

thunder-collection_hours-laboratories-api.json -> Consultas de cada end point para validar su correcto funcionamiento.

