// On require le module de connection
const dataMapper = require('../dataMapper')

// Déclaration de l'objet
const studentController = {
    studentListByPromo: async (req, res, next) => {
        const id = req.params.id
        // déclaration des query sql
        try {
            const promo = await dataMapper.findOnePromo(id)
            // todo : gérer l'zrreur lié au type.
            if (!promo) {
                return next();
            }
            const studentsOfPromo = await dataMapper.findStudentsByPromo(id)
            res.render('promoStudents', {
                promo, students: studentsOfPromo
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = studentController


