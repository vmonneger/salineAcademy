const middleware = require('../middleware');
const controller = require('../controllers/users/user.controller');

module.exports = function(app) {
    app.get('/users', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN'])], controller.getAllUsers);
    
    app.get('/user/current',  controller.getCurrentUser);
    
    app.get('/user/:id', [middleware.auth.isLoggedIn, middleware.auth.isSameUser], controller.getUserById);
    
}