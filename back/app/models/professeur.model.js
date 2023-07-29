module.exports = (sequelize, Sequelize) => {
    const Professeur = sequelize.define("professeur", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Professeur
}