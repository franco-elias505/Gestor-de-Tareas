const fs = require('fs');
const path = require('path');
const { Tarea } = require('../modelos/tarea');

const rutaDatos = path.join(__dirname, '..', '..', 'datos', 'tareas.txt');

class GestorTareas {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo;
    this.tareas = [];
    this.cargarTareas();
  }

  cargarTareas() {
    if (!fs.existsSync(this.rutaArchivo)) {
      this.tareas = [];
      this.guardarTareas();
      return;
    }

    const contenido = fs.readFileSync(this.rutaArchivo, 'utf8').trim();

    if (!contenido) {
      this.tareas = [];
      return;
    }

    const datos = JSON.parse(contenido);
    this.tareas = datos.map((tarea) => new Tarea(tarea));
  }

  guardarTareas() {
    const directorio = path.dirname(this.rutaArchivo);

    if (!fs.existsSync(directorio)) {
      fs.mkdirSync(directorio, { recursive: true });
    }

    const contenido = JSON.stringify(this.tareas, null, 2);
    fs.writeFileSync(this.rutaArchivo, contenido, 'utf8');
  }

  obtenerSiguienteId() {
    if (this.tareas.length === 0) {
      return 1;
    }

    return Math.max(...this.tareas.map((tarea) => tarea.id)) + 1;
  }

  agregarTarea(descripcion) {
    const texto = String(descripcion || '').trim();

    if (!texto) {
      throw new Error('La descripcion no puede estar vacia');
    }

    const nuevaTarea = new Tarea({
      id: this.obtenerSiguienteId(),
      descripcion: texto,
    });

    this.tareas.push(nuevaTarea);
    this.guardarTareas();

    return nuevaTarea;
  }

  eliminarTarea(id) {
    const indice = this.tareas.findIndex((tarea) => tarea.id === Number(id));

    if (indice === -1) {
      return false;
    }

    this.tareas.splice(indice, 1);
    this.guardarTareas();
    return true;
  }

  completarTarea(id) {
    const tarea = this.tareas.find((item) => item.id === Number(id));

    if (!tarea) {
      return null;
    }

    tarea.marcarComoCompletada();
    this.guardarTareas();
    return tarea;
  }

  listarPendientes() {
    return this.tareas.filter((tarea) => !tarea.completada);
  }

  listarTodas() {
    return this.tareas;
  }

  obtenerTareaPorId(id) {
    return this.tareas.find((tarea) => tarea.id === Number(id)) || null;
  }
}

function crearGestorTareas() {
  return new GestorTareas(rutaDatos);
}

module.exports = { GestorTareas, crearGestorTareas };