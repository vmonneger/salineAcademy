const controller = require('../controllers/cours/cours.controller');
const middleware = require('../middleware');

module.exports = function(app) {
    app.post('/cours', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'TEACHER'])], controller.createCour);

    app.get('/students', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'TEACHER'])], controller.getSchoolStudents);

    app.get('/teacher/cours', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'TEACHER'])], controller.getCoursFromTeacher);

    app.get('/teacher/one-cours', controller.getOneCoursFromTeacher);

    app.get('/student/cours', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'STUDENT'])], controller.getCoursFromStudent);

    app.get('/student/one-cours', controller.getOneCoursFromStudent);

    app.put('/cours', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'TEACHER'])], controller.updateCours);

    app.delete('/cours', [middleware.auth.isLoggedIn, middleware.role.checkRole(['ADMIN', 'TEACHER'])], controller.deleteCours);
}