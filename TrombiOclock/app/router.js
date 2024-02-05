// Déclaration des modules
const express = require('express')

// Premet l'utilisation des routes
const router = express.Router()
const mainController = require('./controllers/mainController')
const promoController = require('./controllers/promoController')
const studentController = require('./controllers/studentController')
const adminController = require('./controllers/adminController')
const authController = require('./controllers/authController')

// Notre route home, celle par défault à l'arrivée dans le site
router.get('/',
    mainController.homePage
);

// liste des promos
router.get('/promos',
    promoController.promoList
)

// Affichage d'une seul promo 
router.get('/promo/:id',
    promoController.promoPage
)

// Route pour afficher tous les étudiants d'une promo
router.get('/promo/:id/students',
    studentController.studentListByPromo
)



// route pour l'affichqge du formulaire d'ajout d'étudiant
router.get('/admin/addStudent',
    authController.isAdmin, adminController.showAddStudentForm
)

// route d'ajout de l'étudiant
router.post('/admin/addStudent',
    authController.isAdmin, adminController.addStudent
)

// pour afficher le formulaire de connection
router.get('/login',
    authController.login
)

// pour traiter la connection
router.post('/login',
    authController.postLogin
)

// permet d'attraper toute les route qui n'ont rien trouvé avant et de renvoyer l'erreur 404
router.use((req, res) => {
    res.status(404).render('404')
})




// Permet de récupérer le router dans l'application
module.exports = router