const fs = require( 'fs' );

// declaracion nombre archivo
const archivo = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data ) );

};


const leerDB = () => {
    //validar si existe el archivo
    if ( !fs.existsSync( archivo ) ) {
        return null;
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
    // console.log( info );
    const data = JSON.parse( info );

    // console.log( data );

    return data;
};

module.exports = {
    guardarDB,
    leerDB
};