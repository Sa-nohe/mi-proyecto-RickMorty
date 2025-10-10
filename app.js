// ---------------- Lógica Tabs ----------------
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Quitar active a todos
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // Activar seleccionado
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// ---------------- Rick & Morty ----------------
const characterContainer = document.getElementById("characterContainer");
const searchInput = document.getElementById("searchInput");

async function getCharacters() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        displayCharacters(data.results);

        searchInput.addEventListener("input", () => {
            const filtered = data.results.filter(c =>
                c.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
            displayCharacters(filtered);
        });
    } catch (error) {
        console.error("Error cargando personajes:", error);
    }
}

function displayCharacters(characters) {
    characterContainer.innerHTML = "";
    characters.forEach(c => {
        const card = document.createElement("div");
        card.classList.add("card-character");  // ✅ clase específica para Rick & Morty
        card.innerHTML = `
            <img src="${c.image}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p>Status: ${c.status}</p>
            <p>Especie: ${c.species}</p>
        `;
        characterContainer.appendChild(card);
    });
}

getCharacters();

// ---------------- Comparativa Lambda vs Kappa ----------------
document.getElementById("btnComparativa").addEventListener("click", async () => {
    try {
        const lambdaRes = await fetch("lambda.json");
        if (!lambdaRes.ok) throw new Error("No se pudo cargar lambda.json");
        const lambdaData = await lambdaRes.json();

        const kappaRes = await fetch("kappa.json");
        if (!kappaRes.ok) throw new Error("No se pudo cargar kappa.json");
        const kappaData = await kappaRes.json();

        mostrarComparativa(lambdaData, kappaData);
    } catch (error) {
        console.error("Error al cargar comparativa:", error);
        alert("No se pudo cargar la comparativa");
    }
});

function mostrarComparativa(lambda, kappa) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = `
      <div class="card-architecture">
        <h2>${lambda.titulo}</h2>
        <p>${lambda.descripcion}</p>
        <h3>Ventajas:</h3>
        <ul>${lambda.ventajas.map(v => `<li>${v}</li>`).join("")}</ul>
        <h3>Desventajas:</h3>
        <ul>${lambda.desventajas.map(d => `<li>${d}</li>`).join("")}</ul>
      </div>
      <div class="card-architecture">
        <h2>${kappa.titulo}</h2>
        <p>${kappa.descripcion}</p>
        <h3>Ventajas:</h3>
        <ul>${kappa.ventajas.map(v => `<li>${v}</li>`).join("")}</ul>
        <h3>Desventajas:</h3>
        <ul>${kappa.desventajas.map(d => `<li>${d}</li>`).join("")}</ul>
      </div>
    `;
}

