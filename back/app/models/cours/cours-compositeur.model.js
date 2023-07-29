module.exports = (sequelize, Sequelize) => {
    const CoursCompositeur = sequelize.define("cours_compositeur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursCompositeur
}