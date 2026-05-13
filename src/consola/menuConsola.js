const readline = require('readline/promises');

async function iniciarConsola(gestorTareas) {
  const interfaz = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let salir = false;

  while (!salir) {
    console.log('\n=== Gestor de tareas ===');
    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Marcar tarea como completada');
    console.log('4. Listar tareas pendientes');
    console.log('5. Listar todas las tareas');
    console.log('0. Salir');

    const opcion = (await interfaz.question('Selecciona una opcion: ')).trim();

    // 1. Agregar tarea.
    if (opcion === '1') {
      const descripcion = await interfaz.question('Descripcion de la tarea: ');

      try {
        const tarea = gestorTareas.agregarTarea(descripcion);
        console.log(`Tarea creada con id ${tarea.id}`);
      } catch (error) {
        console.log(error.message);
      }
    }

    // 2. Eliminar tarea.
    if (opcion === '2') {
      const id = await interfaz.question('Id de la tarea a eliminar: ');
      const eliminada = gestorTareas.eliminarTarea(id);
      console.log(eliminada ? 'Tarea eliminada' : 'Tarea no encontrada');
    }

    // 3. Marcar tarea como completada.
    if (opcion === '3') {
      const id = await interfaz.question('Id de la tarea a completar: ');
      const tarea = gestorTareas.completarTarea(id);
      console.log(tarea ? 'Tarea completada' : 'Tarea no encontrada');
    }

    // 4. Listar tareas pendientes.
    if (opcion === '4') {
      const tareas = gestorTareas.listarPendientes();

      if (tareas.length === 0) {
        console.log('No hay tareas pendientes');
      } else {
        tareas.forEach((tarea) => {
          console.log(`${tarea.id} - ${tarea.descripcion}`);
        });
      }
    }

    // 5. Listar todas las tareas.
    if (opcion === '5') {
      const tareas = gestorTareas.listarTodas();

      if (tareas.length === 0) {
        console.log('No hay tareas registradas');
      } else {
        tareas.forEach((tarea) => {
          const estado = tarea.completada ? 'completada' : 'pendiente';
          console.log(`${tarea.id} - ${tarea.descripcion} [${estado}]`);
        });
      }
    }

    if (opcion === '0') {
      salir = true;
    }

    if (!['0', '1', '2', '3', '4', '5'].includes(opcion)) {
      console.log('Opcion invalida');
    }
  }

  interfaz.close();
}

module.exports = { iniciarConsola };