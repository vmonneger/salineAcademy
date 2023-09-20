const controller = require('../controllers/cours/cours.controller');
const middleware = require('../middleware');

module.exports = function(app) {
    app.post('/cours',  controller.createCour);

    app.get('/students',  controller.getSchoolStudents);

    app.get('/teacher/cours',  controller.getCoursFromTeacher);

    app.get('/teacher/one-cours', controller.getOneCoursFromTeacher);

    app.get('/student/cours', controller.getCoursFromStudent);

    app.get('/student/one-cours', controller.getOneCoursFromStudent);

    app.put('/cours',  controller.updateCours);

    app.delete('/cours',  controller.deleteCours);
}