const controller = require('../controllers/abonnement/abonnement.controller');

module.exports = function(app) {
    app.post('/abonnement', controller.subscribe)
}