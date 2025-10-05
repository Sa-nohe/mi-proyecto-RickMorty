// ingesta.js
const axios = require('axios');
const fs = require('fs');

// URL de la API Rick & Morty
const API_URL = 'https://rickandmortyapi.com/api/character/';

// Función Lambda: obtiene datos en tiempo real
async function obtenerLambda() {
    try {
        const response = await axios.get(API_URL);
        const personajes = response.data.results.map(p => p.name);
        console.log("Lambda - Personajes (tiempo real):", personajes);
        return personajes;
    } catch (error) {
        console.error("Error Lambda:", error.message);
    }
}

// Función Kappa: guarda datos localmente
async function obtenerKappa() {
    try {
        const response = await axios.get(API_URL);
        const personajes = response.data.results.map(p => p.name);
        fs.writeFileSync('kappa.json', JSON.stringify(personajes, null, 2));
        console.log("Kappa - Datos guardados localmente.");
        return personajes;
    } catch (error) {
        console.error("Error Kappa:", error.message);
    }
}

// Exportar funciones para usar en index.html (con Node.js + Express)
module.exports = { obtenerLambda, obtenerKappa };

// Ejecutar Kappa para generar el archivo local
obtenerKappa();


