// Cargar JSON de ingesta y mostrar tabla
async function cargarDatos(archivo) {
  try {
    const response = await fetch(archivo);
    const datos = await response.json();
    const tbody = document.querySelector('#tabla-ingesta tbody');
    tbody.innerHTML = '';

    datos.forEach(fila => {
      const tr = document.createElement('tr');
      tr.classList.add(fila.tipo.replace(/\s+/g, ''));

      tr.innerHTML = `
        <td>${fila.nombre}</td>
        <td>${fila.tipo}</td>
        <td>${fila.tiempoRespuesta}</td>
        <td>${fila.memoria}</td>
        <td class="${fila.estado}">${fila.estado}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}

// Cargar personajes de Rick and Morty
async function cargarRickAndMorty() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const contenedor = document.getElementById('rick-morty');
    contenedor.innerHTML = '';

    data.results.slice(0, 6).forEach(personaje => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${personaje.name}</strong> (${personaje.status})</p>
        <img src="${personaje.image}" width="100">
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar personajes:', error);
  }
}



