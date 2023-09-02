const { auth } = require('../middleware');
const controller = require('../controllers/users/user.controller');

module.exports = function(app) {
    app.get('/users', [auth.isLoggedIn], controller.getAllUsers);
    app.get('/user/:id', [auth.isLoggedIn, auth.isSameUser], controller.getUserById);
}