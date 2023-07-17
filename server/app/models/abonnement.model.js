module.exports = (sequelize, Sequelize) => {
    const Abonnement = sequelize.define("abonnement", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duartion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    })

    return Abonnement
}