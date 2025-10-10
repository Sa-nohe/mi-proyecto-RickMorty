// app.js

async function obtenerPersonajes(nombre = "") {
  try {
    const url = nombre
      ? `https://rickandmortyapi.com/api/character/?name=${nombre}`
      : "https://rickandmortyapi.com/api/character";

    const response = await fetch(url);
    const data = await response.json();

    const contenedor = document.getElementById("personajes");
    contenedor.innerHTML = ""; // limpiar antes de mostrar

    if (data.error) {
      contenedor.innerHTML = `<p>No se encontraron personajes con ese nombre.</p>`;
      return;
    }

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

function buscarPersonaje() {
  const nombre = document.getElementById("buscador").value;
  obtenerPersonajes(nombre);
}

obtenerPersonajes(); // cargar personajes al inicio

