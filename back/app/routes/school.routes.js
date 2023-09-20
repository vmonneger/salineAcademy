const controller = require('../controllers/school/account.controller')
const middleware = require('../middleware')

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
    app.post('/school/signup', [upload.single('csv')], controller.signFromCsv);
    
    app.get('/licences', controller.getLicences);

    app.put('/licence', controller.updateLicence);

}