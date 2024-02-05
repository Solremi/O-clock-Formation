// Consigne exercice : je veux que promo controller soit un objet dans lequel il y a une fonction qui s'appelle promoList et qui envoie la page promos, ceux qui ont de l'avance faite la route aus



const promos = require('../../data/promos.json')
const students = require('../../data/students.json')

// On va déclarer toute nos fonctions promo dans un objet
const promoController = {
    promoList: (req, res) => { res.render('promos', { promos }) },
    promoPage: (req, res, next) => {
        const id = req.params.id
        //permet la recherche d'une seule promo
        const promo = promos.find((promo) => {
            return promo.id == id
        })

        if (promo) {
            res.render('promoDetail', { promo })
        } else[
            next()
        ]
    },
    studentListByPromo: (req, res, next) => {
        const id = req.params.id

        const promo = promos.find((promo) => {
            return promo.id === Number(id)
        })

        if (promo) {
            // fonction pour filtrer les étudiant par leur promo
            const studentsOfPromo = students.filter((student) => {
                return student.promo === Number(id)
            })

            res.render('promoStudents', {
                promo, students: studentsOfPromo
            })

        } else {
            next()
        }
    }
}

module.exports = promoController