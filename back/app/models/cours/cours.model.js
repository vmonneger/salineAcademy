module.exports = (sequelize, Sequelize) => {
    const Cours = sequelize.define("cours", {
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