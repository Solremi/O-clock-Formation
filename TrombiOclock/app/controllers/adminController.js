const dataMapper = require('../dataMapper')

const adminController = {
    // permet l'affichage du formulaire
    showAddStudentForm: async (req, res) => {
        try {
            const promos = await dataMapper.findAllPromos()
            res.render('addStudent', { promos })
        } catch (erreur) {
            res.status(500).send(erreur)
        }
    },
    // permet l'enregistrement de l'étudiant en base de données
    addStudent: async (req, res) => {

        const promo_id = req.body.promo_id
        try {
            await dataMapper.addStudent(req.body)
            // Quand l'étudiant est ajouté on affiche la page de sa promo
            res.redirect(`/promo/${promo_id}/students`)
        } catch (erreur) {
            res.status(500).send(erreur)
        }


    }
}

module.exports = adminController