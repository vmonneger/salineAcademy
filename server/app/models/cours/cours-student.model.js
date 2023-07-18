module.exports = (sequelize, Sequelize) => {
    const CoursStudent = sequelize.define("cours_student", {

        finished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    })

    return CoursStudent
}