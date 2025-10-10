// app.js

async function obtenerPersonajes() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const contenedor = document.getElementById("personajes");
    contenedor.innerHTML = ""; // limpiar antes de mostrar

    data.results.forEach(personaje => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}">
        <h3>${personaje.name}</h3>
        <p><strong>Especie:</strong> ${personaje.species}</p>
        <p><strong>Estado:</strong> ${personaje.status}</p>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los personajes:", error);
  }
}

obtenerPersonajes();
