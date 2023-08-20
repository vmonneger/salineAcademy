const { verifyToken } = require('../Middleware/authJwt');

const controller = require('../controllers/video/video.controller');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        '/videos',
        [
            verifyToken
        ],
        controller.getAll)

    app.get(
        '/video',
        [
            verifyToken
        ],
        controller.getVideo)

    app.post('/video', controller.CreateVideo)
}