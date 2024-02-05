// On va déclarer toute nos fonction main dans un objet

const mainController = {

    homePage: (req, res) => {
        res.render('home')
    }
}


// On export cette objet pour le rendre disponible au reste de l'application
module.exports = mainController