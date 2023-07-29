module.exports = (sequelize, Sequelize) => {
    const CoursFormat = sequelize.define("cours_format", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursFormat
}