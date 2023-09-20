const controller = require('../controllers/video/video.controller');
const middleware = require('../middleware');

module.exports = function(app) {
    app.get('/videos', [middleware.auth.isLoggedIn], controller.getAll)

    app.get('/video', [middleware.auth.isLoggedIn], controller.getVideo)

    app.post('/video', [middleware.auth.isLoggedIn],controller.CreateVideo)
}