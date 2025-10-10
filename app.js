document.getElementById("btnComparativa").addEventListener("click", async () => {
    try {
        // Cargar Lambda
        const lambdaRes = await fetch("lambda.json");
        if (!lambdaRes.ok) throw new Error("No se pudo cargar lambda.json");
        const lambdaData = await lambdaRes.json();

        // Cargar Kappa
        const kappaRes = await fetch("kappa.json");
        if (!kappaRes.ok) throw new Error("No se pudo cargar kappa.json");
        const kappaData = await kappaRes.json();

        mostrarComparativa(lambdaData, kappaData);
    } catch (error) {
        console.error("Error al cargar la comparativa:", error);
        alert("No se pudo cargar la comparativa");
    }
});

function mostrarComparativa(lambda, kappa) {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = `
      <div class="card">
        <h2>${lambda.titulo}</h2>
        <p>${lambda.descripcion}</p>
        <h3>Ventajas:</h3>
        <ul>${lambda.ventajas.map(v => `<li>${v}</li>`).join("")}</ul>
        <h3>Desventajas:</h3>
        <ul>${lambda.desventajas.map(d => `<li>${d}</li>`).join("")}</ul>
      </div>
      <div class="card">
        <h2>${kappa.titulo}</h2>
        <p>${kappa.descripcion}</p>
        <h3>Ventajas:</h3>
        <ul>${kappa.ventajas.map(v => `<li>${v}</li>`).join("")}</ul>
        <h3>Desventajas:</h3>
        <ul>${kappa.desventajas.map(d => `<li>${d}</li>`).join("")}</ul>
      </div>
    `;
}

