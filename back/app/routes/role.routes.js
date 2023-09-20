const controller = require('../controllers/roles/role.controller');
const middleware = require('../middleware')

module.exports = function(app) {
    app.post('/role/findOne', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN'])], controller.findOneRole)
}