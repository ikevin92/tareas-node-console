const inquirer = require( 'inquirer' );
require( 'colors' );

// preguntas para el inquirer
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`

            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tareas`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`

            },
            {
                value: '0',
                name: `${ '0.'.green } Salir \n`
            }
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log( '=========================='.green );
    console.log( '  Selecione una opcion  '.white );
    console.log( '=========================='.green );

    // le pasamos las preguntas al inquirer
    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;
};


const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`,
        }
    ];

    console.log( '\n' );

    await inquirer.prompt( question );

};


const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );

    return desc;
};

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1 }`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        };
    } );

    // agrega la opcion para salir
    choices.unshift( {
        value: '0',
        name: '0'.green + ' Cancelar'
    } );

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    // capturamos el id de la tarea
    const { id } = await inquirer.prompt( preguntas );

    return id;

};

const confirmar = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
};


const mostrarListadoCheckList = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1 }`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        };
    } );


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    // capturamos el id de la tarea
    const { ids } = await inquirer.prompt( pregunta );

    return ids;

};



// exportacion de las funciones
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
};