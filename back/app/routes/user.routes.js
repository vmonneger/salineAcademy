const { auth } = require('../middleware');
const controller = require('../controllers/users/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept, Cookie"
        );
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.get('/users', [auth.isLoggedIn], controller.getAllUsers);
    app.get('/user/:id', [auth.isLoggedIn, auth.isSameUser], controller.getUserById);


}