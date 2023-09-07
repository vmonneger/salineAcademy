module.exports = (sequelize, Sequelize) => {
    const Compositeur = sequelize.define("compositeur", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Compositeur
}