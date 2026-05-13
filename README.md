## Gestor de Tareas
Aplicacion en JavaScript para administrar tareas desde consola y via API REST.
## Ejecutar
- `npm start` inicia consola y API.
- `npm run api` inicia solo la API.
- `npm run consola` inicia solo la consola.
## API
- `POST /tareas` crea una tarea.
- `DELETE /tareas/:id` elimina una tarea.
- `PUT /tareas/:id` marca una tarea como completada.
- `GET /tareas` lista tareas pendientes.
- `GET /tareas/:id` muestra una tarea por id.
## Archivo de datos
Las tareas se guardan en `datos/tareas.txt` en formato JSON.
