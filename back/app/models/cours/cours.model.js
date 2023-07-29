module.exports = (sequelize, Sequelize) => {
    const Cours = sequelize.define("cours", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Cours
}