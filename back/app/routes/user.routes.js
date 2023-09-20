const middleware = require('../middleware');
const controller = require('../controllers/users/user.controller');

module.exports = function(app) {
    app.get('/users', [middleware.auth.isLoggedIn], controller.getAllUsers);
    
    app.get('/user/current', [middleware.auth.isLoggedIn], controller.getCurrentUser);
    
    app.get('/user/:id', [middleware.auth.isLoggedIn, middleware.auth.isSameUser], controller.getUserById);
    
}