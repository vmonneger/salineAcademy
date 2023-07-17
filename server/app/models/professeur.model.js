module.exports = (sequelize, Sequelize) => {
    const Professeur = sequelize.define("professeur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Professeur
}