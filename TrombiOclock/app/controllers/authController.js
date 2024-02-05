



const authController = {
    login: (req, res) => {
        //on envoie juste le vue avec le formulaire
        res.render('login')
    },
    // On traite l'envoie de login depuis le client
    postLogin: (req, res) => {
        // L'utilisateur nous a envoyé son login grace au formulaire
        const userLogin = req.body.login

        // On veut sauvegarder ce login dans la session
        req.session.login = userLogin




        // on redirige vers la page d'accueil
        res.redirect('/')
    },
    isAdmin: (req, res, next) => {
        if (req.session.login !== 'michel') {
            return res.status(403).send('accès non autorisé')
        } else {
            next()
        }
    }
}

module.exports = authController