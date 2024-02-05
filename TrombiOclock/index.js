// Pour utiliser les variables d'envirronnement
require('dotenv').config()


// Déclaration des modules
const express = require('express')
const router = require('./app/router')
const session = require('express-session')



// Initialisation
const app = express()
const PORT = process.env.PORT || 3000;

// Setup de l'application
app.set('view engine', 'ejs')
app.set('views', './app/views')

// Pour rendre disponible les fichiers static
app.use(express.static('./public'))


// bodyParser, permet de récupérer l'objet req.body
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: process.env.SESSION_SECRETKEY, // permet de chiffrer le cookie,
    resave: true, // permet de sauvegarder automatiquement le session
    saveUninitialized: true, // permet de sauvegarder une session vide
    cookie: {
        // Permet de configurer les informations du cookie
    }
}))

// Permet d'avoir le app.locals.users sur tout nos vue quand un utilisateur s'est connecté
// permet l'affichage ou nom de l'ajout d'utilisateur dans le menu
app.use((req, res, next) => {
    if (req.session.login) {
        app.locals.user = req.session.login
    }
    next()
})

app.use(router)


// Lancement de l'application 
app.listen(PORT, () => {
    console.log(`Application lancée sur le port ${PORT}`)
})