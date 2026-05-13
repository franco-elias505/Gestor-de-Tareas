class Tarea {
  constructor({ id, descripcion, completada = false, creadaEn = new Date().toISOString() }) {
    this.id = id;
    this.descripcion = descripcion;
    this.completada = completada;
    this.creadaEn = creadaEn;
  }

  marcarComoCompletada() {
    this.completada = true;
  }
}

module.exports = { Tarea };