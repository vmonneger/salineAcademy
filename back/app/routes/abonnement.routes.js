const controller = require('../controllers/abonnement/abonnement.controller');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Acces-Control-Allow-Headers",
            "x-acces-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/abonnement', controller.subscribe)
}