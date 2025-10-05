// ingesta.js

const lambdaFile = 'lambda.json';
const kappaFile = 'kappa.json';

// Obtener Lambda desde JSON
async function obtenerLambda() {
    try {
        const response = await fetch(lambdaFile);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener Lambda:', error);
        return [];
    }
}

// Obtener Kappa desde JSON
async function obtenerKappa() {
    try {
        const response = await fetch(kappaFile);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener Kappa:', error);
        return [];
    }
}

// Mostrar datos en pantalla
async function mostrarDatos(tipo) {
    let data = [];
    if(tipo === 'lambda') data = await obtenerLambda();
    else if(tipo === 'kappa') data = await obtenerKappa();

    const div = document.getElementById(tipo);
    div.innerHTML = data.map(d => `${d.name} (${d.species}, ${d.status})`).join('<br>');
}

// Botones interactivos
document.getElementById('btnLambda').addEventListener('click', () => mostrarDatos('lambda'));
document.getElementById('btnKappa').addEventListener('click', () => mostrarDatos('kappa'));

// Mostrar ambos al cargar
window.onload = () => {
    mostrarDatos('lambda');
    mostrarDatos('kappa');
};


