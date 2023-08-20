module.exports = (sequelize, Sequelize) => {
    const Abonnement = sequelize.define("abonnement", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        limite_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        monthly: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })

    return Abonnement
}