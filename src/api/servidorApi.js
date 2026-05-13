const express = require('express');

function iniciarApi(gestorTareas) {
  const app = express();
  const puerto = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/salud', (req, res) => {
    res.json({ estado: 'ok' });
  });

  // POST /tareas: agregar una nueva tarea.
  app.post('/tareas', (req, res) => {
    try {
      const { descripcion } = req.body;
      const tarea = gestorTareas.agregarTarea(descripcion);

      res.status(201).json({ mensaje: 'Tarea creada', tarea });
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  });

  // DELETE /tareas/{id}: eliminar una tarea.
  app.delete('/tareas/:id', (req, res) => {
    const eliminada = gestorTareas.eliminarTarea(req.params.id);

    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    return res.json({ mensaje: 'Tarea eliminada' });
  });

  // PUT /tareas/{id}: marcar una tarea como completada.
  app.put('/tareas/:id', (req, res) => {
    const tarea = gestorTareas.completarTarea(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    return res.json({ mensaje: 'Tarea completada', tarea });
  });

  // GET /tareas: listar tareas pendientes.
  app.get('/tareas', (req, res) => {
    const tareas = gestorTareas.listarPendientes();
    res.json({ total: tareas.length, tareas });
  });

  // GET /tareas/{id}: obtener una tarea especifica.
  app.get('/tareas/:id', (req, res) => {
    const tarea = gestorTareas.obtenerTareaPorId(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    return res.json({ tarea });
  });

  app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
  });

  app.listen(puerto, () => {
    console.log(`API activa en http://localhost:${puerto}`);
  });
}

module.exports = { iniciarApi };