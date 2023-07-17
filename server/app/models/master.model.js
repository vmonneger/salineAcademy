module.exports = (sequelize, Sequelize) => {
    const Master = sequelize.define("master", {
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

    return Master
}