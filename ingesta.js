const axios = require('axios');
const fs = require('fs');

// --------------------
// Lambda (API en tiempo real)
// --------------------
axios.get('https://rickandmortyapi.com/api/character')
  .then(response => {
    const characters = response.data.results.map(c => c.name);
    console.log("Lambda characters:", characters);

    // Guardamos en lambda.json
    fs.writeFileSync('lambda.json', JSON.stringify(characters, null, 2));
  })
  .catch(err => console.error('Error Lambda:', err));

// --------------------
// Kappa (Datos guardados localmente)
// --------------------
const kappaCharacters = [
  "Rick Sanchez",
  "Morty Smith",
  "Summer Smith",
  "Beth Smith",
  "Jerry Smith",
  "Abadango Cluster Princess",
  "Abradolf Lincler",
  "Adjudicator Rick",
  "Agency Director",
  "Alan Rails",
  "Albert Einstein",
  "Alexander",
  "Alien Googah",
  "Alien Morty",
  "Alien Rick",
  "Amish Cyborg",
  "Annie",
  "Antenna Morty",
  "Antenna Rick",
  "Ants in my Eyes Johnson"
];

// Guardamos en kappa.json
fs.writeFileSync('kappa.json', JSON.stringify(kappaCharacters, null, 2));
console.log("Kappa characters:", kappaCharacters);


