const btn = document.getElementById("btnCargar");
const contenedor = document.getElementById("personajes");

btn.addEventListener("click", async () => {
  contenedor.innerHTML = "<p>Cargando personajes...</p>";

  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();

    contenedor.innerHTML = ""; // limpiar antes de mostrar

    data.results.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><strong>Estado:</strong> ${p.status}</p>
        <p><strong>Especie:</strong> ${p.species}</p>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar personajes.</p>";
    console.error(error);
  }
});
