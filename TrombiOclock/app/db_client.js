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

module.exports = client;