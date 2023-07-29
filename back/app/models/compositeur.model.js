module.exports = (sequelize, Sequelize) => {
    const Compositeur = sequelize.define("compositeur", {

        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Compositeur
}