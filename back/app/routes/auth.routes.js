const { verifySignUp, auth } = require('../middleware');
const controller = require('../controllers/auth/auth.controller');

module.exports = function(app) {
    app.post('/auth/signup',  controller.signUp);
    app.post('/auth/signin', controller.signIn);
    app.post('/auth/logout', controller.logout);

    // A voir si on doit supprimer
    app.get('/auth/check-auth', controller.checkAuth);
  
    app.post('/auth/update-password',  controller.updatePassword);
};