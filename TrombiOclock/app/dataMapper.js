//Importation du module de connection
const client = require('./db_client')

// le dataMapper sert à collecter les données
const dataMapper = {
    findAllPromos: async () => {
        const sql = 'SELECT * FROM promo ORDER BY name ASC'
        const data = await client.query(sql)
        return data.rows
    },
    findOnePromo: async (id) => {
        const sql = `SELECT * FROM promo WHERE id=${id}`
        const data = await client.query(sql)
        if (data.rows.length === 0) {
            return null
        } else {
            return data.rows[0]
        }
    },
    findStudentsByPromo: async (promoId) => {
        const sql = `SELECT * FROM student WHERE promo_id = ${promoId}`
        const data = await client.query(sql)
        return data.rows
    },
    addStudent: async (studentInfo) => {
        const { first_name, last_name, github_username, promo_id } = studentInfo
        // les requêtes insert permettent d'ajouter des données
        const sql = `INSERT INTO student(first_name, last_name, github_username, profile_picture_url, promo_id)
        VALUES ($1,$2,$3,$4,$5);`

        const value = [first_name, last_name, github_username, `https://github.com/${github_username}.png`, promo_id]


        await client.query(sql, value)
    }
}

module.exports = dataMapper