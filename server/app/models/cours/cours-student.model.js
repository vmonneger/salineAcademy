module.exports = (sequelize, Sequelize) => {
    const CoursStudent = sequelize.define("cours_student", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        finished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    })

    return CoursStudent
}