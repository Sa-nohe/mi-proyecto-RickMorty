// ingesta.js
const axios = require('axios');
const fs = require('fs');

const lambdaFile = 'lambda.json';
const kappaFile = 'kappa.json';

// Función para obtener datos de Lambda (API)
async function obtenerLambda() {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const nombres = response.data.results.map(c => ({
            name: c.name,
            species: c.species,
            status: c.status
        }));
        fs.writeFileSync(lambdaFile, JSON.stringify(nombres, null, 2));
        return nombres;
    } catch (error) {
        console.error('Error al obtener los datos de Lambda:', error.message);
        return [];
    }
}

// Función para obtener datos de Kappa (local)
function obtenerKappa() {
    try {
        if (!fs.existsSync(kappaFile)) {
            fs.writeFileSync(kappaFile, JSON.stringify([]));
        }
        const data = fs.readFileSync(kappaFile);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al obtener los datos de Kappa:', error.message);
        return [];
    }
}

// Exportar las funciones para poder llamarlas desde front-end
module.exports = {
    obtenerLambda,
    obtenerKappa
};


