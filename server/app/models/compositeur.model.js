module.exports = (sequelize, Sequelize) => {
    const Compositeur = sequelize.define("compositeur", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Compositeur
}