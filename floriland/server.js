const express = require("express");
const app = express();
const port = 3000;

// Importation des données des fleurs
const fleurs = require("./fleurs");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Route pour une fleur spécifique
app.get("/fleurs/:flowerName", (req, res) => {
  const name = req.params.flowerName;
  res.send(`<h1>Vous avez choisi la fleur : ${name}</h1>`);
});

// Route pour la page d'accueil de 'fleurs'
app.get("/fleurs", (req, res) => {
  res.send(`<h1>Floriland - Bienvenue !</h1>`);
});

// Route pour la page d'accueil
app.get("/", (req, res) => {
  let listItems = ""; // Construire les éléments de la liste
  for (const fleur of fleurs) {
    listItems += `<li>${fleur}</li>`;
  }

  // Construire la structure HTML complète avec la liste de fleurs
  const htmlContent = `
    <html>
      <head>
        <title>Floriland</title>
      </head>
      <body>
        <h1>Floriland - Bienvenue !</h1>
        <ul>
          ${listItems}
        </ul>
      </body>
    </html>
  `;

  res.send(htmlContent); // Envoyer la réponse complète
});
