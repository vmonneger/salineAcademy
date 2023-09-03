const controller = require('../controllers/school/account.controller')

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
    app.post('/school/signup', upload.single('csv'), controller.signFromCsv)
}