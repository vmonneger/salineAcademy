const middleware = require('../middleware')

const controller = require('../controllers/abonnement/abonnement.controller');

module.exports = function(app) {
    app.post('/abonnement', [middleware.auth.isLoggedIn], controller.subscribe)
}