const controller = require('../controllers/cours/cours.controller');

module.exports = function(app) {
    app.post('/cours', controller.createCour);

    app.get('/students', controller.getSchoolStudents);

    app.get('/teacher/cours', controller.getCoursFromTeacher);

    app.get('/student/cours', controller.getCoursFromStudent)
}