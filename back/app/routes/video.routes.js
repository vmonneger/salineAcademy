const { auth } = require('../middleware');
const controller = require('../controllers/video/video.controller');

module.exports = function(app) {
    app.get('/videos', controller.getAll)
    app.get('/video', [auth.isLoggedIn], controller.getVideo)
    app.post('/video', controller.CreateVideo)
}