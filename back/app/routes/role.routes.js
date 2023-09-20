const controller = require('../controllers/roles/role.controller');
const middleware = require('../middleware')

module.exports = function(app) {
    app.post('/role/findOne',  controller.findOneRole)
}