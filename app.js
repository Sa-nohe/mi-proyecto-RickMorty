// ----------------- SECCIÓN 1: API RICK AND MORTY -----------------
const personajesDiv = document.getElementById("personajes");
const buscador = document.getElementById("buscador");
let personajes = [];

function mostrarPersonajes(lista) {
  personajesDiv.innerHTML = "";
  lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><strong>Estado:</strong> ${p.status}</p>
      <p><strong>Especie:</strong> ${p.species}</p>
    `;
    personajesDiv.appendChild(card);
  });
}

async function cargarPersonajes() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    personajes = data.results;
    mostrarPersonajes(personajes);
  } catch (error) {
    console.error("Error al cargar los personajes:", error);
  }
}

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = personajes.filter(p =>
    p.name.toLowerCase().includes(texto)
  );
  mostrarPersonajes(filtrados);
});

cargarPersonajes();

// ----------------- SECCIÓN 2: LAMBDA vs KAPPA -----------------
const btnComparar = document.getElementById("btnComparar");
const tablaBody = document.querySelector("#tabla-ingesta tbody");
const cargando = document.getElementById("cargando");

async function cargarJSON(archivo) {
  const response = await fetch(archivo);
  return await response.json();
}

function crearFilaComparativa(lambdaItem, kappaItem) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${lambdaItem.Fuente}</td>
    <td>${lambdaItem.Tipo}</td>
    <td>${lambdaItem.Tiempo}</td>
    <td>${lambdaItem.Memoria}</td>
    <td>${lambdaItem.Estado}</td>
    <td>${kappaItem.Tiempo}</td>
    <td>${kappaItem.Memoria}</td>
    <td>${kappaItem.Estado}</td>
  `;
  tablaBody.appendChild(fila);
}

btnComparar.addEventListener("click", async () => {
  try {
    cargando.style.display = "block";
    tablaBody.innerHTML = "";

    const lambdaDatos = await cargarJSON("lambda.json");
    const kappaDatos = await cargarJSON("kappa.json");

    const maxLength = Math.max(lambdaDatos.length, kappaDatos.length);

    for (let i = 0; i < maxLength; i++) {
      const lambdaItem = lambdaDatos[i] || { Fuente: "-", Tipo: "-", Tiempo: "-", Memoria: "-", Estado: "-" };
      const kappaItem = kappaDatos[i] || { Fuente: "-", Tipo: "-", Tiempo: "-", Memoria: "-", Estado: "-" };
      crearFilaComparativa(lambdaItem, kappaItem);
    }
  } catch (error) {
    alert("Error al cargar los datos: " + error);
  } finally {
    cargando.style.display = "none";
  }
});

// ----------------- SECCIÓN 3: BATCH / SQL -----------------
const btnBatch = document.getElementById("btnBatch");
const tablaBatch = document.querySelector("#tabla-batch tbody");

btnBatch.addEventListener("click", async () => {
  try {
    const response = await fetch("data.json");
    const batchData = await response.json();

    tablaBatch.innerHTML = "";
    batchData.forEach(item => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.id}</td>
        <td>${item.usuario}</td>
        <td>${item.query}</td>
        <td>${item.resultado}</td>
      `;
      tablaBatch.appendChild(fila);
    });
  } catch (error) {
    alert("Error al cargar la data batch: " + error);
  }
});

