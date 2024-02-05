// On commence par require le module
const { Client } = require('pg')

// Etablir la connection avec le serveur distant
const client = new Client('postgresql://etudiant:js4life@pg.oclock.lan/trombi')


// Fonction de connection
// elle prend en paramètre un fonction de callback avec en premier paramètre de cette fonction une erreur si il y en a une
client.connect((error) => {
    // Gestion de l'erreur
    if (error) {
        console.log(error)
    } else {
        console.log('BDD Connecté')
        // On appelle la method query
        // Le premier paramètre est un requête SQL
        // Second paramètre un callback, avec un premier paramètre l'erreur si il y en a une et la reponse de la requte quand tout s'est bien passé.
        client.query('SELECT * FROM student', (error, response) => {
            // Gestion de l'erreur
            if (error) {
                console.log(error)
            } else {
                console.log(response.rows)
            }
            client.end()
        })

    }


})

