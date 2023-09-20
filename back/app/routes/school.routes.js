const controller = require('../controllers/school/account.controller')
const middleware = require('../middleware')

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function(app) {
    app.post('/school/signup', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN']) ,upload.single('csv')], controller.signFromCsv);
    
    app.get('/licences', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN'])], controller.getLicences);

    app.put('/licence', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN'])], controller.updateLicence);

    app.delete('/licence', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN'])], controller.deleteLicence);
}