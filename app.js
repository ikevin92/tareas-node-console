require( 'colors' );
const { guardarDB, leerDB } = require( './helpers/guardarArchivo' );
const { inquirerMenu, pausa, leerInput, mostrarListadoCheckList, listadoTareasBorrar, confirmar } = require( './helpers/inquirer' );
const Tareas = require( './models/tareas' );


// limpiamos la consola
// console.clear();

const main = async () => {

    let opt = '';
    // inicializamos tareas
    const tareas = new Tareas();

    // leemos la base de datos
    const tareasDB = leerDB();

    if ( tareasDB ) {
        // console.log( tareasDB );
        //cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {

        //Imprime y capturamos la opcion del Menu
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                // crea opcion
                const desc = await leerInput( 'Descripcion: ' );
                // console.log( desc );
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3': // listar las completadas
                tareas.listarPendientesCompletadas( true );
                break;
            case '4': // listar las pendientes
                tareas.listarPendientesCompletadas( false );
                break;
            case '5': // Completado || pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                // console.log( ids );
                tareas.toggleCompletadas( ids );
                break;
            case '6': // borrar
                // console.log( 'borrar' );
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    // preguntar si esta seguro
                    const ok = await confirmar( '¿Estas seguro?' );
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea Borrada' );
                    };
                }
                break;

        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0' );

};


main();