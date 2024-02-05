// Require le module dataMapper
const dataMapper = require('../dataMapper')


// On va déclarer toute nos fonctions promo dans un objet
const promoController = {
    promoList: async (req, res) => {
        try {
            const promos = await dataMapper.findAllPromos()
            res.render('promos', { promos })
        } catch (erreur) {
            res.status(500).send(erreur)
        }
    },
    promoPage: async (req, res, next) => {
        const id = req.params.id
        // TODO : traiter l'ereur lié au type de données
        try {
            const promo = await dataMapper.findOnePromo(id)
            if (!promo) {
                return next()
            }
            res.render('promoDetail', { promo })

        } catch (erreur) {
            res.status(500).send(erreur)
        }
        // Ne pas écrire de code ici car client.query est asynchrone
    },
}

module.exports = promoController