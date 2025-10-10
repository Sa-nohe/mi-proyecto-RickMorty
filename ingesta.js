const btnComparar = document.getElementById('btnComparar');
const tablaBody = document.querySelector('#tabla-ingesta tbody');
const cargando = document.getElementById('cargando');

// Función para cargar un JSON
async function cargarJSON(archivo) {
    const response = await fetch(archivo);
    return await response.json();
}

// Crear fila comparativa
function crearFilaComparativa(lambdaItem, kappaItem) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${lambdaItem.Fuente}</td>
        <td>${lambdaItem.Tipo}</td>
        <td class="lambda ${lambdaItem.Estado.toLowerCase()}">${lambdaItem.Tiempo}</td>
        <td class="lambda ${lambdaItem.Estado.toLowerCase()}">${lambdaItem.Memoria}</td>
        <td class="lambda ${lambdaItem.Estado.toLowerCase()}">${lambdaItem.Estado}</td>
        <td class="kappa ${kappaItem.Estado.toLowerCase()}">${kappaItem.Tiempo}</td>
        <td class="kappa ${kappaItem.Estado.toLowerCase()}">${kappaItem.Memoria}</td>
        <td class="kappa ${kappaItem.Estado.toLowerCase()}">${kappaItem.Estado}</td>
    `;
    tablaBody.appendChild(fila);
}

// Evento del botón
btnComparar.addEventListener('click', async () => {
    try {
        cargando.style.display = 'block';
        tablaBody.innerHTML = '';

        const lambdaDatos = await cargarJSON('lambda.json');
        const kappaDatos = await cargarJSON('kappa.json');

        const maxLength = Math.max(lambdaDatos.length, kappaDatos.length);

        for (let i = 0; i < maxLength; i++) {
            const lambdaItem = lambdaDatos[i] || { Fuente: '-', Tipo: '-', Tiempo: '-', Memoria: '-', Estado: '-' };
            const kappaItem = kappaDatos[i] || { Fuente: '-', Tipo: '-', Tiempo: '-', Memoria: '-', Estado: '-' };
            crearFilaComparativa(lambdaItem, kappaItem);
        }

    } catch (error) {
        alert('Error al cargar los datos: ' + error);
    } finally {
        cargando.style.display = 'none';
    }
});
