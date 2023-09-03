const { authJwt } = require('../Middleware');
const controller = require('../controllers/users/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/users', controller.getAllUsers);
    
    app.get('/user/:id', controller.getUserById);
    
    app.post('/reset-password', [authJwt.verifyToken], controller.resetPassword )
}