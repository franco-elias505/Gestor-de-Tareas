const { crearGestorTareas } = require('./src/servicios/gestorTareas');
const { iniciarApi } = require('./src/api/servidorApi');
const { iniciarConsola } = require('./src/consola/menuConsola');

async function arrancarAplicacion() {
  const gestorTareas = crearGestorTareas();
  const modoApi = process.argv.includes('--api');
  const modoConsola = process.argv.includes('--consola');

  if (modoApi && !modoConsola) {
    iniciarApi(gestorTareas);
    return;
  }

  if (modoConsola && !modoApi) {
    await iniciarConsola(gestorTareas);
    return;
  }

  iniciarApi(gestorTareas);
  await iniciarConsola(gestorTareas);
}

arrancarAplicacion();

/*
Enfoque: use una clase para representar cada tarea y otra para centralizar
la logica de persistencia en un archivo de texto. La consola y la API usan la
misma instancia del gestor para evitar duplicar reglas y mantener el estado
sincronizado en un solo lugar.
*/