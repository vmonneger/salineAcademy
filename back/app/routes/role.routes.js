const controller = require('../controllers/roles/role.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept, Cookie"
        );
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.post('/role/create', controller.createRole)

    app.post('/role/findOne', controller.findOneRole)
}