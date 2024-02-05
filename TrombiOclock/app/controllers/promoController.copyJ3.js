// On utilise le module node-postgres
const { Client } = require('pg')

// Connection à la base de données en ligne
const client = new Client(process.env.DATA_BASE_URL)
client.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connection Bdd réussit')
    }
})




// On va déclarer toute nos fonctions promo dans un objet
const promoController = {
    promoList: (req, res) => {
        // méthode query qui permet d'envoyer notre requete SQL
        client.query('SELECT * FROM promo ORDER BY name ASC', (error, response) => {
            // Si il y a une erreur
            if (error) {
                // Comme il s'agit d'une erreur serveur on met un statut 500 et on envoie l'erreur
                res.status(500).send(error)
            } else {
                // on définit l'objet promo est on render la page
                const promos = response.rows;
                console.log(promos)
                res.render('promos', { promos })
            }
        })
        // Ne pas écrire de code ici, car la fonction query est asynchrone
    },
    promoPage: (req, res, next) => {
        const id = req.params.id
        //permet la recherche d'une seule promo
        // stock la requete
        const sqlQuery = `SELECT * FROM promo WHERE id=${id}`;

        // j'appelle ma requête SQL
        client.query(sqlQuery).then((response) => {
            // Je traite le première entrée de la réponse
            const promo = response.rows[0]
            if (promo) {
                res.render('promoDetail', { promo: promo })
            } else {
                next()
            }
            // En cas d'erreur
        }).catch((error) => {
            res.status(500).send(error)
        })
        // Ne pas écrire de code ici car client.query est asyncrhone


    },

    // a modifier
    studentListByPromo: (req, res, next) => {
        const id = req.params.id

        // déclaration des query sql
        const sqlQueryPromo = `SELECT name FROM promo WHERE id=${id}`
        const sqlQueryStudent = `SELECT * FROM student WHERE promo_id=${id}`

        // Première query
        client.query(sqlQueryPromo).then((dataPromo) => {
            const promo = dataPromo.rows[0]
            // deuxième fonction
            client.query(sqlQueryStudent).then((dataStudents) => {
                const studentsOfPromo = dataStudents.rows
                // Le if permet de gérer les cas ou il manque une information
                if (promo) {
                    res.render('promoStudents', {
                        promo, students: studentsOfPromo
                    })
                } else {
                    next()
                }
                // Bien penser à gérer les erreurs
            }).catch(error => error.status(500).send(error))
        }).catch(error => error.status(500).send(error))
    }





    //     const promo = promos.find((promo) => {
    //         return promo.id === Number(id)
    //     })

    //     if (promo) {
    //         // fonction pour filtrer les étudiant par leur promo
    //         const studentsOfPromo = students.filter((student) => {
    //             return student.promo === Number(id)
    //         })

    //         res.render('promoStudents', {
    //             promo, students: studentsOfPromo
    //         })

    //     } else {
    //         next()
    //     }
    // }
}

module.exports = promoController