const express = require("express");
const games = require("./games.json");
const { isPromise } = require("util/types");

const PORT = 3000;
const app = express();

// on rend disponible le tableau games à TOUS les templates
app.locals.games = games;
app.locals.siteName = "GameCenter";

// mise en place du moteur de vues
app.set("view engine", "ejs");
app.set("views", "./views");

// mise en place du dossier contenant les assets statiques
app.use(express.static("./public"));

//un middleware qui recupère la date de la requete, l'ip et le chemin
app.use((req, res, next) => {
  const date = new Date().toLocaleString();
  console.log(date);
  const ip = req.ip;
  console.log(ip);
  const path = req.path;
  console.log(path);
  console.log(`Date: ${date}, IP: ${ip}, Path: ${path}`);
  next();
});

// route pour l'affichage de la page d'accueil
app.get("/", (request, response) => {
  response.render("index");
});

/*
app.get('/game/fourchette', (request, response)=>{
  response.render('fourchette', { gameName: 'fourchette' });
})

app.get('/game/diceRoller', (request, response)=>{
  response.render('diceRoller', { gameName: 'diceRoller' });
})
*/

app.get("/game/:gameName", (request, response) => {
  const gameName = request.params.gameName;
  const selectedGame = games.find((game) => game.name === gameName);
  if (!selectedGame) {
    return response.status(404).render("404");
  }
  return response.render(gameName, { selectedGame });
});

app.use((req, res, next) => {
  res.status(404).render("error404", {
    cssFile: "/css/error404.css",
  });
});

// lancement du serveur
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
