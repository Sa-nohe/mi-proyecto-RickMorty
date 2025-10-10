const personajesDiv = document.getElementById('personajes');
const searchInput = document.getElementById('search');

// Cargar personajes
async function cargarPersonajes() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        mostrarPersonajes(data.results);
    } catch (error) {
        console.error("Error al cargar personajes:", error);
    }
}

// Mostrar tarjetas
function mostrarPersonajes(personajes) {
    personajesDiv.innerHTML = "";
    personajes.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p><strong>Estado:</strong> ${p.status}</p>
            <p><strong>Especie:</strong> ${p.species}</p>
        `;
        personajesDiv.appendChild(card);
    });
}

// Filtrar personajes
searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
        const data = await res.json();
        if (data.results) {
            mostrarPersonajes(data.results);
        } else {
            personajesDiv.innerHTML = "<p>No se encontraron personajes.</p>";
        }
    } catch (error) {
        console.error("Error en búsqueda:", error);
    }
});

// Inicial
cargarPersonajes();

