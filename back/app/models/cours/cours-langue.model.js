module.exports = (sequelize, Sequelize) => {
    const CoursLangue = sequelize.define("cours_langue", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursLangue
}