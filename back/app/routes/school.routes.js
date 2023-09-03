const controller = require('../controllers/school/account.controller')

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, multipart/form-data"
        );
        next();
    });


    app.post(
        '/school/signup', upload.single('csv'), controller.signFromCsv)
}