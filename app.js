// ---------------- Tabs ----------------
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// ---------------- Rick & Morty ----------------
const characterContainer = document.getElementById("characterContainer");

async function getCharacters() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        console.error("Error cargando personajes:", error);
    }
}

function displayCharacters(characters) {
    characterContainer.innerHTML = "";
    characters.forEach(c => {
        const card = document.createElement("div");
        card.classList.add("card-character");
        card.innerHTML = `
            <img src="${c.image}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p>Status: ${c.status}</p>
        `;
        // Mostrar detalles al hacer click
        card.addEventListener("click", () => {
            alert(`${c.name}\nEspecie: ${c.species}\nGénero: ${c.gender}\nUbicación: ${c.location.name}`);
        });
        characterContainer.appendChild(card);
    });
}

getCharacters();

// Selección de elementos del modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalStatus = document.getElementById("modalStatus");
const modalSpecies = document.getElementById("modalSpecies");
const modalGender = document.getElementById("modalGender");
const modalLocation = document.getElementById("modalLocation");
const closeModal = document.getElementById("closeModal");

// Función para abrir modal con datos
function openModal(character) {
    modal.style.display = "block";
    modalImg.src = character.image;
    modalName.textContent = character.name;
    modalStatus.textContent = `Status: ${character.status}`;
    modalSpecies.textContent = `Especie: ${character.species}`;
    modalGender.textContent = `Género: ${character.gender}`;
    modalLocation.textContent = `Ubicación: ${character.location.name}`;
}

// Cerrar modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// ----------------- Modificación en displayCharacters -----------------
function displayCharacters(characters) {
    characterContainer.innerHTML = "";
    characters.forEach(c => {
        const card = document.createElement("div");
        card.classList.add("card-character");
        card.innerHTML = `
            <img src="${c.image}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p>Status: ${c.status}</p>
        `;
        card.addEventListener("click", () => openModal(c)); // Abrir modal al click
        characterContainer.appendChild(card);
    });
}


// ---------------- Comparativa Lambda/Kappa ----------------
document.getElementById("btnComparativa").addEventListener("click", async () => {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    try {
        const lambdaRes = await fetch("lambda.json");
        const lambdaData = await lambdaRes.json();
        const kappaRes = await fetch("kappa.json");
        const kappaData = await kappaRes.json();

        // Crear tarjetas
        container.appendChild(createArchitectureCard(lambdaData, "Lambda"));
        container.appendChild(createArchitectureCard(kappaData, "Kappa"));
    } catch (error) {
        console.error("Error al cargar comparativa:", error);
        alert("No se pudo cargar la comparativa");
    }
});

function createArchitectureCard(data, tipo) {
    const card = document.createElement("div");
    card.classList.add("card-architecture");
    card.innerHTML = `
        <h2>${tipo}</h2>
        <p>${data.descripcion}</p>
        <h3>Ventajas:</h3>
        <ul>${data.ventajas.map(v => `<li>${v}</li>`).join("")}</ul>
        <h3>Desventajas:</h3>
        <ul>${data.desventajas.map(d => `<li>${d}</li>`).join("")}</ul>
    `;
    return card;
}



