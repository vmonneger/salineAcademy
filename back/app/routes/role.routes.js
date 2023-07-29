const controller = require('../controllers/roles/role.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/role/create', controller.createRole)
    app.post('/api/role/findOne', controller.findOneRole)
}