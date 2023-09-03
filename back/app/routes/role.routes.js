const controller = require('../controllers/roles/role.controller');

module.exports = function(app) {
    app.post('/role/create', controller.createRole)
    app.post('/role/findOne', controller.findOneRole)
}