const { verifySignUp } = require('../middleware');
const { auth } = require('../middleware');
const controller = require('../controllers/auth/auth.controller');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept, Cookie"
        );
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.post(
        '/auth/signup',
        [
            verifySignUp.checkDuplicateEmail,
        ],
        controller.signUp
    );

    app.post('/auth/signin', controller.signIn)
    app.post('/auth/logout', controller.logout);
    app.get('/auth/check-auth', controller.checkAuth);
};